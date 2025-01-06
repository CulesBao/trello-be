import { List } from "./List.entity";
import listRepository from "./list.repository";
import { ListDTO, ListDTORequest } from "./list.dto";
import { Board } from "../board/Board.entity";
import boardRepository from "../board/board.repository";
import { User } from "../user/User.entity";
import activityLogController from "../activityLog/activityLog.controller";
import { Actions } from "../../common/enums/actitvitiesLog.enum";

class listService {
    public async createList(user: User, data: ListDTORequest): Promise<ListDTO> {
        const list: List = new List();
        const board: Board = await boardRepository.findById(data.boardId)
        list.name = data.name;
        list.order = data.order;
        list.board = board
        list.cards = []

        const newList: List = await listRepository.create(list)
        const realList: List = await listRepository.findById(newList.id)
        await activityLogController.ListActivity(user, data.boardId, Actions.CREATE_LIST, realList.id)
        return new ListDTO(realList)
    }
    public async findById(listId: number): Promise<ListDTO> {
        const list: List = await listRepository.findById(listId)
        return new ListDTO(list)
    }
    public async updateById(listId: number, updatedList: List, user: User): Promise<ListDTO> {
        await listRepository.findById(listId)
        const updateList: List = await listRepository.update(listId, updatedList)
        await activityLogController.ListActivity(user, updatedList.board.id, Actions.UPDATE_LIST, updateList.id)
        return new ListDTO(updateList)
    }
}
export default new listService()