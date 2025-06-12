import { IQuestion } from "./Iquestion"
export interface IExam {
    _id:string,
    title:string,
    teacherId:string,
    students:[string],
    questions:[IQuestion]

}
