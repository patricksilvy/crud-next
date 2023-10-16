import Title from "./Title"

interface LayautProps {
    title: string
    children: any
}

export default function Layaut(props: LayautProps) {
    return (
        <div className={`
            flex flex-col w-2/3
            bg-white text-gray-900 rounded-md
        `}>
            <Title>{props.title}</Title>
            <div className="p-6">
                {props.children}
            </div>
        </div>
    )
}