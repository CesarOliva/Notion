import Image from "next/image";

const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[250px] sm:w-[350px] sm:h-[300px] md:w-[400px] md:h-[300px]">
                    <Image src="/hero.avif" fill className="object-contain" alt="Hero"/>
                </div>
            </div>
        </div>
    );
}

export default Heroes;