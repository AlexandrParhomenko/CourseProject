import type {FC} from "react";

interface Props {
    title: string
}

const MenuItem: FC<Props> = ({title, ...props}) => {
    return (
        <div {...props} className={"w-1/4 min-w-[300px] border rounded-md p-2 text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
            {title}
        </div>
    );
};

export default MenuItem;