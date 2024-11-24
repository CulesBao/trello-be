import { CheckList } from "./CheckList.entity";
import checkListRepository from "./checkList.repository";
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import { StatusCodes } from "http-status-codes";

class checkListService {
    public async addCheckList(checkList: CheckList): Promise<CustomSuccessfulResponse> {
        const newCheckList = await checkListRepository.create(checkList)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'CheckList added successfully', newCheckList)
    }
    public async deleteCheckList(checkListId: number, userId: number): Promise<CustomSuccessfulResponse> {
        const checkList = await checkListRepository.findById(checkListId)

        if (checkList.user.id !== userId) {
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to delete this checkList')
        }
        await checkListRepository.delete(checkList.id)

        return new CustomSuccessfulResponse(StatusCodes.OK, 'CheckList deleted successfully')
    }

    public async updateCheckList(checkList: CheckList): Promise<CustomSuccessfulResponse> {
        const checkListExists = await checkListRepository.findById(checkList.id)

        if (checkListExists.user.id !== checkList.user.id) {
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to update this checkList')
        }
        const updatedCheckList = await checkListRepository.update(checkList.id, checkList)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'CheckList updated successfully', updatedCheckList)
    }
    public async getCheckList(checkListId: number, userId: number): Promise<CustomSuccessfulResponse> {
        const checkList = await checkListRepository.findById(checkListId)

        if (checkList.user.id !== userId)
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to view this checkList')

        return new CustomSuccessfulResponse(StatusCodes.OK, 'CheckList retrieved successfully', checkList)
    }
}
export default new checkListService()

