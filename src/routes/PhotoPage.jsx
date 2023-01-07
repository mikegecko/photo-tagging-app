import imgJ from "../images/junk.png";
import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";

/*
----------- TODO -----------
    ❌ Refactor this page, there is too much going 
        on and needs to be modified
*/

export default function PhotoPage(props) {
  const obj = { disabled: false, velocityDisabled: false };
  const obj2 = { disabled: true };
  const imgref = useRef(null);
  const [marker, setMarker] = useState({ x: 0, y: 0, mx: 0, my: 0 });
  const [scale, setScale] = useState(1);
  const [anim, setAnim] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [doubleClickPos, setDoubleClickPos] = useState({ x: 0, y: 0 });
  const open = Boolean(anchorEl);
  const transRef = useRef();
  const dash = (
    <svg
      className="lines"
      width={89 * (1 / scale)}
      height={19 * (1 / scale)}
      viewBox="0 0 89 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${anim ? "dash" : ""} ${hidden ? "hidden" : ""}`}
        id="line"
        d="M0.394531 0.693024L14.3945 18.693M13.9999 18.5H88.9999"
        stroke="black"
      />
    </svg>
  );
  const circle = (
    <svg
      className="circles"
      width={10 * (1 / scale) + 1.3}
      height={10 * (1 / scale) + 1.3}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={`${anim ? "fade" : ""} ${hidden ? "hidden" : ""}`}
        onAnimationEnd={() => setAnim(false)}
        id="circle"
        cx="5"
        cy="5"
        r="5"
        fill="#000000"
      />
    </svg>
  );

  const dbClick = (e) => {
    //Gets accurate position of mouse cursor on image
    //console.log(imgref.current.getBoundingClientRect());
    const rect = imgref.current.getBoundingClientRect();
    const ax = e.clientX - rect.x;
    const ay = e.clientY - rect.y;
    const offsetx = -5;
    const offsety = -10;
    const fx = ax * (1 / scale) + offsetx;
    const fy = ay * (1 / scale) + offsety;
    //fx fy are final mouse positions
    console.log(ax * (1 / scale), ay * (1 / scale));
    setDoubleClickPos({ x: ax * (1 / scale), y: ay * (1 / scale) });
    setHidden(false);
    setAnim(true);
    setMarker({ x: fx, y: fy, mx: e.clientX, my: e.clientY });
    setAnchorEl(e.currentTarget);
  };
  const zoomHandler = (ref, e) => {
    const sc = ref.state.scale;
    setScale(sc);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setHidden(true);
  };
  const handleClick = (e) => {
    const id = e.target.id;
    props.validateSelection(doubleClickPos.x, doubleClickPos.y, id);
    handleClose();
  };
  useEffect(() => {});
  return (
    <div className="images" onDoubleClick={dbClick}>
      <TransformWrapper
        initialPositionX={0}
        initialPositionY={0}
        initialScale={1}
        limitToBounds={false}
        panning={obj}
        minScale={0.8}
        maxScale={3}
        doubleClick={obj2}
        velocityAnimation={obj2}
        onZoom={zoomHandler}
        minPositionX={-1500}
        maxPositionX={50000}
        minPositionY={-1500}
        maxPositionY={5000}
        ref={transRef}
      >
        <Button variant="contained" size="small" sx={{position: 'absolute', zIndex: 1, top: 60, left: 210}} onClick={() => transRef.current.resetTransform()}>Reset</Button>
        <TransformComponent>
          <div ref={imgref}>
            <Box
              sx={{
                color: "red",
                position: "absolute",
                left: marker.x,
                top: marker.y,
                fontSize: "2rem",
              }}
            >
              {circle}
              {dash}
              <Menu
                id="menu-select"
                anchorReference="anchorPosition"
                anchorPosition={{ top: marker.my + 18, left: marker.mx + 30 }}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 124,
                  },
                }}
              >
                {props.loading ? (
                  <div>...loading</div>
                ) : (
                  props.items.items.map((item, index) => {
                    if (item.isFound) {
                      return<></>;
                    } else {
                      return (
                        <MenuItem
                          onClick={handleClick}
                          key={index}
                          id={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    }
                  })
                )}
              </Menu>
            </Box>
            {props.loading ? (
              <div></div>
            ) : (
              props.items.items.map((item, index) => {
                if(item.isFound){
                    return props.debugBoundingBox(...item.p1, ...item.p2, index);
                }
                else{
                    return;
                }
              })
            )}
            <img src={imgJ} alt="Stuff" />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
