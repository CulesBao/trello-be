import { StatusCodes } from "http-status-codes";
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import { List } from "./List.entity";
import listRepository from "./list.repository";

class listService {
    public async createList(list: List): Promise<CustomSuccessfulResponse> {
        const newList: Partial<List> = await listRepository.createList(list)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'List created successfully', newList)
    }
    public async getById(listId: number, userId: number): Promise<CustomSuccessfulResponse> {
        const list: List = await listRepository.findById(listId)
        if (list.board.users?.find((value) => value.id == userId) == undefined) {
            return new CustomSuccessfulResponse(StatusCodes.NOT_FOUND, 'User cannot access this list')
        }

        return new CustomSuccessfulResponse(StatusCodes.OK, 'List found', list)
    }
    public async updateById(listId: number, updatedList: List, userId: number): Promise<CustomSuccessfulResponse> {
        const list: List = await listRepository.findById(listId)
        if (!list) {
            return new CustomSuccessfulResponse(StatusCodes.NOT_FOUND, 'List not found')
        }
        if (list.board.users.find((value) => value.id == userId) == undefined) {
            return new CustomSuccessfulResponse(StatusCodes.NOT_FOUND, 'User cannot access this list')
        }
        const updateList: List = await listRepository.update(listId, updatedList)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'List updated successfully', updateList)
    }
}
export default new listService()