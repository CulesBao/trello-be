import { StatusCodes } from "http-status-codes";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import { Board } from "../board/entity/Board";
import { List } from "./entity/List";
import listRepository from "./list.repository";

class listService {
    public async createList(list: List): Promise<CustomSuccessfulResponse> {
        await listRepository.create(list)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'List created successfully', list)
    }
    public async getById(list: List): Promise<CustomSuccessfulResponse> {
        return new CustomSuccessfulResponse(StatusCodes.OK, 'List found', list)
    }
    public async updateById(listId: number, updatedList: List): Promise<CustomSuccessfulResponse> {
        const list: List | undefined = await listRepository.findById(listId)
        if (!list) {
            return new CustomSuccessfulResponse(StatusCodes.NOT_FOUND, 'List not found')
        }
        await listRepository.update(listId, updatedList)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'List updated successfully', updatedList)
    }
}
export default new listService()