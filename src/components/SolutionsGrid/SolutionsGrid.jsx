import { tinaField } from "tinacms/dist/react"
import SolutionCard from "./SolutionCard"

function SolutionsGrid(props){
    const solutions = props.solutions
    return (
        <>
            <section className="pb-16">
                <div className=" overflow-hidden z-30 py-12 max-w-[1000px] mx-auto rounded-md">
                        <h2 data-tina-field={tinaField(props,'solutions_heading')} className="font-bold text-[36px] text-white text-center">
                            {props.solutions_heading}
                        </h2>
                        <div
                        className={`rounded-[12px] h-1 w-80 bg-primary mx-auto mt-2`}
                        />
                        <div className="pt-12 flex flex-wrap justify-center gap-x-6 gap-y-12">
                            {solutions.map((card,i) => (
                                <SolutionCard card={card} key={i} props={props} />
                            ))}
                        </div>
                </div>
            </section>
        </>
    )
}

export default SolutionsGrid