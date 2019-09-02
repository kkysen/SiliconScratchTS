export var sb3;
(function (sb3) {
    sb3.Target = {
        isStage(target) {
            return target.isStage;
        },
        isSprite(target) {
            return !target.isStage;
        },
    };
})(sb3 || (sb3 = {}));
