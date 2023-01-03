import imgJ from "../images/junk.png";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

export default function PhotoPage(props) {
    const obj = {disabled:false, velocityDisabled: false};
    const obj2 = {disabled: true}
  return (
    <div className="images" onDoubleClick={props.doubleClickHandler}>
        <TransformWrapper initialPositionX={0}
        initialPositionY={0}
        initialScale={.8}
        limitToBounds={false}
        panning={obj}  
        minScale={0.8}     
        doubleClick={obj2} 
        velocityAnimation={obj2}
        >
          <TransformComponent>
            <img src={imgJ} alt="Stuff"  />
          </TransformComponent>
        </TransformWrapper>
    </div>
  );
}
