import type {FC, HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string
}

const MenuItem: FC<Props> = ({title, ...props}) => {
    return (
        <div {...props} className={"w-1/4 min-w-[500px] border rounded-md p-2 text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
            {title}
        </div>
    );
};

export default MenuItem;