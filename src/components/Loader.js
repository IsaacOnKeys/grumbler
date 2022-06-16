import React from 'react';

function Loader() {
    consoloe.log('loader')
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
         <div className="h-20 w-20 border-primary-300 border-8"> Loader</div>  
        </div> 
    ) 
}

export default Loader; 