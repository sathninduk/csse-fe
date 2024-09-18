export default function CardTbl(props) {
    return (
        <div className="bg-slate-700 flex justify-center h-16 w-44 rounded-2xl">
            <div className="p-1">
                <h1 className="">{props.name}</h1>
                <p className="text-2xl font-bold">{props.count}</p>
            </div>

        </div>
    )
};