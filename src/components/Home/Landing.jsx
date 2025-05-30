// import {TinaMarkdown} from 'tinacms/dist/rich-text'
// import { tinaField } from 'tinacms/dist/react'

// function Landing(props){
    
    

//     return(
//     <div className="flex flex-col items-center justify-center h-screen w-full">
//         <div className='w-150' data-tina-field={tinaField(props,'heading')}>
//             <TinaMarkdown content={props.heading} components={{
//                 h1:props => <h1 className="text-[60px] font-bold text-center mb-4" {...props}/>,
//                 h3:props => <h3 className="text-center secondary-text mb-6" {...props}/>
//             }}/>
//         </div>
        
//         <div className="flex gap-x-8" >
//             {props.buttons?.map((button,i) =>
//                 button.style === 'border' ? (
//                     <button key={i} data-tina-field={tinaField(props.buttons[i], 'label')} className={`px-4 capitalize py-2 w-${button.width}  border primary-border rounded hover:text-white/80 transition-colors duration-300`}>
//                     {button.label}
//                     </button>
//                 ) : button.style === 'button' ? (
//                     <button key={i} data-tina-field={tinaField(props.buttons[i], 'label')} className={`bg-primary capitalize cursor-pointer px-4 py-2 w-${button.width}  rounded hover:opacity-80 text-white`}>
//                     {button.label}
//                     </button>
//                 ) : null
//             )}

            
//         </div>
// </div>

//     )
// }


// export default Landing


import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField } from 'tinacms/dist/react';

function Landing(props) {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="flex flex-col items-center text-center w-full max-w-lg gap-6">
        <div className="w-full" data-tina-field={tinaField(props, 'heading')}>
          <TinaMarkdown
            content={props.heading}
            components={{
              h1: (props) => (
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                  {...props}
                />
              ),
              h3: (props) => (
                <h3 className="text-base sm:text-lg secondary-text mb-6" {...props} />
              ),
            }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {props.buttons?.map((button, i) =>
            button.style === 'border' ? (
              <button
                key={i}
                data-tina-field={tinaField(props.buttons[i], 'label')}
                className={`px-4 py-2 capitalize border primary-border rounded hover:text-white/80 transition-colors duration-300 w-full sm:w-auto`}
              >
                {button.label}
              </button>
            ) : button.style === 'button' ? (
              <button
                key={i}
                data-tina-field={tinaField(props.buttons[i], 'label')}
                className={`bg-primary text-white px-4 py-2 capitalize cursor-pointer rounded hover:opacity-80 w-full sm:w-auto`}
              >
                {button.label}
              </button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
