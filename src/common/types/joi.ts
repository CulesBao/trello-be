export class JoiCustomMessage {
    public string(field: string) {
        return `${field} is not a string`
    }
    public trim(field: string) {
        return `${field} have spaces`
    }
    public alphanum(field: string) {
        return `${field} only contain number and alphabet`
    }
    public min(field: string, length: number){
        return `${field}.length must be greater than ${length}`
    }
    public required(field: string){
        return `${field} is required!`
    }
    public email(field: string){
        return `${field} is invalid`
    }
    public date(field: string){
        return `${field} is invalid`
    }
    public number(field: string){
        return `${field} is invalid`
    }
}