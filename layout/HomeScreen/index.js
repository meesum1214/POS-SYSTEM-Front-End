export default () => {
    return (
        <div className="flex justify-center py-12">
            <div className="grid grid-cols-2 gap-6">
                <div className="w-64 h-32 border rounded-md bg-gray-300 flex justify-center items-center text-center font-semibold cursor-pointer">HALF BOARD(HB)</div>
                <div className="w-64 h-32 border rounded-md bg-gray-300 flex justify-center items-center text-center font-semibold cursor-pointer">FULL BOARD(FB)</div>
                <div className="w-64 h-32 border rounded-md bg-gray-300 flex justify-center items-center text-center font-semibold cursor-pointer">ALL INCLUSIVE(AI)</div>
                <div className="w-64 h-32 border rounded-md bg-gray-300 flex justify-center items-center text-center font-semibold cursor-pointer">BREAD & BREAKFAST(BB)</div>
            </div>
        </div>
    )
}