import { Button } from "./Button";
import { Text } from "./Text";
import { IoClose } from "react-icons/io5";

function ConfirmationModal() {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
            <div className="bg-white rounded-2xl px-[2rem] py-[1.5rem] flex flex-col items-center gap-[7rem] relative w-full mx-[1rem]">
                <button className="absolute top-[1rem] right-[1rem] text-gray-500 hover:text-gray-700">
                    <IoClose size={30} />
                </button>

                <Text size="lg" className="text-center">
                    Do you want to apply new filter
                </Text>

                <div className="flex gap-[2rem]">
                    <Button variant="secondary">Use old filter</Button>
                    <Button variant="primary">Apply new filter</Button>
                </div>
            </div>
        </div>
    );
}

export { ConfirmationModal };