interface RaterOptions {
    element:HTMLElement;
    rateCallback?:(rating: number, done?: () => any) => any; 
    max?:number; 
    rating?:number; 
    disableText?:string; 
    ratingText?:string;
    showToolTip?:boolean;
    starSize?:number;
    step?:number;
    readOnly?:boolean;
    reverse?:boolean;
}

interface Rater {
    disable:() => void; 
    enable:() => void;
    dispose: ()=> void;
    setRating:(rating) => void; 
    getRating:() => number;
    clear:() => void;
    element:HTMLElement;
}

declare module "rater-js" {
    export default raterFunction;
}

declare function raterFunction(options:RaterOptions): Rater;