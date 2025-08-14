import { CheckBox } from "./Checkbox";
import { Text } from "./Text";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

function Modal({ onClose }: { onClose: () => void }) {
    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        let ignore = false;

        fetch(new URL('../shared/temp/filterData.json', import.meta.url))
            .then(res => res.json())
            .then(data => {
                if (!ignore) {
                    setFilterItems(data.filterItems);
                }
            })
            .catch(err => console.error(err));

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl w-[90%] h-[90%] p-8 overflow-y-auto">

                <div className="relative mb-4">
                    <Text size="lg" className="font-semibold text-center block">
                        Filter
                    </Text>

                    <IoClose
                        size={30}
                        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={onClose}
                    />
                </div>


                <hr className="mb-6 border-gray-300" />

                {filterItems.map((item, index) => (
                    <section key={index} className="my-10">
                        <Text size="md" className="font-semibold mb-3 block">
                            {item.name}
                        </Text>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-7 my-5">
                            {item.options.map((option, idx) => (
                                <label key={idx} className="flex items-center gap-2">
                                    <CheckBox />
                                    <Text size="sm">{option.name}</Text>
                                </label>
                            ))}
                        </div>

                        {index < filterItems.length - 1 && <hr className="border-gray-300 my-10" />}
                    </section>
                ))}

                <hr className="border-gray-300" />
                <div className="relative w-full flex items-center justify-center my-10">
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Button variant="primary">Apply</Button>
                    </div>

                    <Text
                        size="sm"
                        className="ml-auto text-primary-100 underline cursor-pointer whitespace-nowrap"
                    >
                        Clear all parameters
                    </Text>
                </div>

            </div>
        </div>
    );
}

export { Modal };