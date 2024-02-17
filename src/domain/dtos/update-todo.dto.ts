export class UpdateTodoDto {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ){}

    get values(){
        const returnObject: {[key:string]:any} = {}
        if (this.text) returnObject.text = this.text
        if (this.completedAt) returnObject.completedAt = this.completedAt
        return returnObject
    }

    static create(props:{[key:string]:any}): [string?, UpdateTodoDto?] {
        const {id, text, completedAt } = props

        if (!id || isNaN(id)) return ['id must be a valid number']

        let newCompleterAt = completedAt 
        if (completedAt) {
            newCompleterAt = new Date(completedAt) // convierte la fecha en un objeto de fecha
            if (newCompleterAt.toString() === 'Invalid Date') return ['CompletedAt must be a valid date']
        }

        return [undefined, new UpdateTodoDto(id, text, newCompleterAt)]
    }
}