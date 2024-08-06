import React ,{useState,useEffect,useRef} from 'react'

const Stepper = ({steps,currentStep,isSubmitted}) => {

  const [newStep,setNewStep]=useState([]);
  
  const stepRef = useRef();

  const updateStep = (stepNumber,steps)=>{
    const newSteps=[...steps];
    // console.log(newSteps)
    let count = 0;
    while(count < newSteps.length){
      // current step 
      if(count===stepNumber){
        newSteps[count]={
          ...newSteps[count],
          highlighted:true,
          selected:true,
          completed:false
        }
        count++;
      }
      // step completed 
      else if(count<stepNumber){
        newSteps[count]={
          ...newSteps[count],
          highlighted:false,
          selected:true,
          completed:true
        };
        count++;
      }
      // step pending  
      else{
        newSteps[count]={
          ...newSteps[count],
          highlighted:false,
          selected:false,
          completed:false
        };
        count++;
      }

    }
    if(count===newSteps.length && isSubmitted){
      newSteps[count-1]={
        ...newSteps[count-1],
        highlighted:true,
        selected:true,
        completed:true
      }
      console.log("hh");
    }
    console.log(count);
    return newSteps;
  }

  useEffect(()=>{
    const stepsState = steps.map((step,index)=>
      Object.assign({},{
        description : step,
        completed: false,
        highlighted: index=== 0 ?true:false ,
        selected : index=== 0 ?true:false 
      })
    );
    stepRef.current=stepsState;
    const current=updateStep(currentStep-1,stepRef.current);
    setNewStep(current);
  },[steps,currentStep]
)

  const displaySteps = newStep?.map((step,index) => {
    return(
      <div 
        key={index}
        className={index !== newStep.length -1 ?"w-full flex items-center justify-center":"flex items-center"}
      >
      <div className="relative flex flex-col items-center text-blue-600">
        <div className={`flex items-center justify-center rounded-full w-12 h-12 py-3 border-2 border-gray-300 transition duration-500 ease-in-out ${step.selected ?
          "bg-blue-600 text-white font-bold border border-blue-600":
          ""
          }`}>
          {/* stepper number  */}
          {step.completed?(
            <span className='text-white font-bold text-xl'>&#10003;</span>
          ):(index + 1)}
        </div>
        <div className={`absolute top-0 text-center mt-16 w-28 text-xs font-medium uppercase  ${step.highlighted ? "text-blue-600": "text-gray-400"}`}>
          {/* stepper description  */}
          {step.description}
        </div>
      </div>
  
      <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed?"border-blue-600":"border-gray-300"}`}>
        {/* stepper line  */}
      </div>
    </div>
    );
  } )

  return (
    <>
        <div className='flex justify-between items-center mx-5 py-4'>
           {displaySteps}
        </div>
    </>
  )
}

export default Stepper