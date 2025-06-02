import Image from "next/image";

const Usercard = ({type}:{type:string}) => {
    return (
        <div className="rounded-2xl odd:bg-purple even:bg-yellow p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-grreen-600">2024/25</span>
                <Image src="/more.png" alt="more" width={20} height={20} className="" />
            </div>
            <h1 className="text-2xl font-semibol my-4">1,234</h1>
            <h2 className="capitalize tet-sm font-medium text-gray-500">{type}</h2>
        </div>
    )
}
export default Usercard;