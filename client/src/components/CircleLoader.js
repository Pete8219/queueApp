import React from 'react'

export const CircleLoader = () => {
    return (
      <>
        
        <div className="preloader-wrapper small active">

        {/* <p style={{display:"block"}}>Проверяем ....</p>  */}       
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </>
    )
}
