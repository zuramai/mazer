
raterJs({
    element: document.querySelector("#basic"), 
    starSize: 32,
    rateCallback:function rateCallback(rating, done) {
        this.setRating(rating); 
        done(); 
    }
});

raterJs({
    element:document.querySelector("#step"),
    rateCallback:function rateCallback(rating, done) {
        this.setRating(rating); 
        done(); 
    },
    starSize:32,
    step:0.5
})
raterJs({
    element:document.querySelector("#unli1"),
    rateCallback:function rateCallback(rating, done) {
        this.setRating(rating); 
        done(); 
    },
    starSize:32,
    max:10, 
    step:0.5
})
raterJs({
    element:document.querySelector("#unli2"),
    rateCallback:function rateCallback(rating, done) {
        this.setRating(rating); 
        done(); 
    },
    starSize:32,
    max:16, 
    step:0.5
})