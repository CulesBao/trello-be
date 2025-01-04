import { CheckList } from "./CheckList.entity";
import checkListRepository from "./checkList.repository";

class checkListService {
    public async addCheckList(checkList: CheckList): Promise<CheckList> {
        const newCheckList = await checkListRepository.create(checkList)
        return newCheckList    
    }
    public async deleteCheckList(checkListId: number): Promise<void> {
        const checkList = await checkListRepository.findById(checkListId)
        await checkListRepository.delete(checkList.id)
    }

    public async updateCheckList(checkList: CheckList): Promise<CheckList> {
        await checkListRepository.findById(checkList.id)
        const updatedCheckList: CheckList = await checkListRepository.update(checkList.id, checkList)
        return updatedCheckList    
    }
    public async getCheckList(checkListId: number): Promise<CheckList> {
        const checkList = await checkListRepository.findById(checkListId)
        return checkList    
    }
}
export default new checkListService()

