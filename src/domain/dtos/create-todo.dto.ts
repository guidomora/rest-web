


// Aca vamos a establecer los dtos que vamos a utilizar para la comunicacion entre el cliente y el servidor
// los dtos son objetos que se utilizan para transferir datos entre diferentes sistemas

export class CreateTodo {
    private constructor(
        public readonly text: string
    ){}

    static create(props:{[key:string]:any}): [string?, CreateTodo?] {
        const { text } = props
        if (!text) return ['text property is required', undefined]
        return [undefined, new CreateTodo(text)]
    }
}