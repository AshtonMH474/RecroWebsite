import { tinaField } from "tinacms/dist/react"
import { FaUser } from "react-icons/fa";
import { TinaMarkdown } from "tinacms/dist/rich-text";


function TestimonyCard({test}){
    return(
        <div className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[450px] px-4 py-6">
            <div className="flex items-center mb-3 gap-x-3">
                {test.src ? (
                <img
                data-tina-field={tinaField(test,'src')}
                src={test.src}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-500"
                />
                ):(
                <div data-tina-field={tinaField(test,'src')} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-500">
                    <FaUser className="text-gray-600 text-2xl" />
                </div>
                )}
                
                <div>
                    {test.name && (
                        <h2 data-tina-field={tinaField(test,'name')} className="text-[20px] primary-color font-bold text-white leading-tight flex-1">
                            {test.name}
                        </h2>
                    )}
                    {test.job && (
                        <h3 data-tina-field={tinaField(test,'job')} className="text-[15px] text-[#C2C2BC] leading-tight"> 
                            {test.job}
                        </h3>
                    )}
                </div>
            </div>
            {test.quote && (
                <div className="overflow-y-auto h-90" data-tina-field={tinaField(test,'quote')}>
                    <TinaMarkdown
                    content={test.quote}
                    components={{
                        
                      p: ({ children }) => (
                        <p className="text-[#C2C2BC] font-bold   text-[14px]">
                            <span className="primary-color">"</span>
                                {children}
                            <span className="primary-color">"</span>
                            </p>
                      ),
                    }} />
                </div>
            )}
        </div>
    )
}

export default TestimonyCard