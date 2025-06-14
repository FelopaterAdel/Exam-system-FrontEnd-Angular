import { IQuestion } from "./Iquestion"
export interface IExam {
    _id:string,
    title:string,
    teacherEmail:string,
    students:[string],
    questions:[IQuestion]

}
