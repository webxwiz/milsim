import { useRouter } from "next/navigation";

export const useScrollAndRedirect = () => {
    const router = useRouter();

    return (pathname: string, id: string) => {

        router.push(pathname);

        setTimeout(() => {
            const targetBlock = document.getElementById(id);
            if (targetBlock) {
                targetBlock.scrollIntoView({ behavior: "smooth" });
            }
        }, 700);
    };
};
