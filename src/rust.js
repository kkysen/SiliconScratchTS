import { sb3 } from "./sb3";
export var rust;
(function (rust) {
    const AssetId = {
        of(assetId) {
            return assetId;
        },
    };
    let ImageDataFormat;
    (function (ImageDataFormat) {
        ImageDataFormat[ImageDataFormat["PNG"] = 0] = "PNG";
        ImageDataFormat[ImageDataFormat["SVG"] = 1] = "SVG";
        ImageDataFormat[ImageDataFormat["JPEG"] = 2] = "JPEG";
        ImageDataFormat[ImageDataFormat["JPG"] = 3] = "JPG";
        ImageDataFormat[ImageDataFormat["BMP"] = 4] = "BMP";
        ImageDataFormat[ImageDataFormat["GIF"] = 5] = "GIF";
    })(ImageDataFormat || (ImageDataFormat = {}));
    const ImageDataFormats = {
        of(dataFormat) {
            switch (dataFormat) {
                case "png":
                    return ImageDataFormat.PNG;
                case "svg":
                    return ImageDataFormat.SVG;
                case "jpeg":
                    return ImageDataFormat.JPEG;
                case "jpg":
                    return ImageDataFormat.JPG;
                case "bmp":
                    return ImageDataFormat.BMP;
                case "gif":
                    return ImageDataFormat.GIF;
                default:
                    throw new Error(`invalid ImageDataFormat: ${dataFormat}`);
            }
        },
    };
    let AudioDataFormat;
    (function (AudioDataFormat) {
        AudioDataFormat[AudioDataFormat["WAV"] = 0] = "WAV";
        AudioDataFormat[AudioDataFormat["WAVE"] = 1] = "WAVE";
        AudioDataFormat[AudioDataFormat["MP3"] = 2] = "MP3";
    })(AudioDataFormat || (AudioDataFormat = {}));
    const AudioDataFormats = {
        of(dataFormat) {
            switch (dataFormat) {
                case "wav":
                    return AudioDataFormat.WAV;
                case "wave":
                    return AudioDataFormat.WAVE;
                case "mp3":
                    return AudioDataFormat.MP3;
                default:
                    throw new Error(`invalid AudioDataFormat: ${dataFormat}`);
            }
        },
    };
    const Asset = {
        check(asset) {
            const { assetId, dataFormat, md5Ext } = asset;
            if (`${assetId}.${dataFormat}` !== md5Ext) {
                throw new Error(`${"`${assetId}.${dataFormat}`"} !== md5Ext: "${assetId}.${dataFormat}" !== "${md5Ext}"`);
            }
        },
    };
    const Costume = {
        of(costume) {
            Asset.check(costume);
            const { assetId, name, dataFormat, md5Ext } = costume;
            const { bitmapResolution, rotationCenterX, rotationCenterY } = costume;
            return {
                asset: {
                    asset_id: AssetId.of(assetId),
                    data_format: ImageDataFormats.of(dataFormat),
                    name,
                },
                bitmap_resolution: bitmapResolution,
                rotation_center: { x: rotationCenterX, y: rotationCenterY },
            };
        },
    };
    const Sound = {
        of(sound) {
            Asset.check(sound);
            const { assetId, name, dataFormat, md5Ext } = sound;
            const { rate, sampleCount } = sound;
            return {
                asset: {
                    asset_id: AssetId.of(assetId),
                    data_format: AudioDataFormats.of(dataFormat),
                    name,
                },
                rate,
                sample_count: sampleCount,
            };
        },
    };
    let BlockCategory;
    (function (BlockCategory) {
        BlockCategory[BlockCategory["Motion"] = 0] = "Motion";
        BlockCategory[BlockCategory["Look"] = 1] = "Look";
        BlockCategory[BlockCategory["Sound"] = 2] = "Sound";
        BlockCategory[BlockCategory["Event"] = 3] = "Event";
        BlockCategory[BlockCategory["Control"] = 4] = "Control";
        BlockCategory[BlockCategory["Sensing"] = 5] = "Sensing";
        BlockCategory[BlockCategory["Operator"] = 6] = "Operator";
        BlockCategory[BlockCategory["Variable"] = 7] = "Variable";
        BlockCategory[BlockCategory["Block"] = 8] = "Block";
    })(BlockCategory || (BlockCategory = {}));
    let Shadow;
    (function (Shadow) {
        Shadow[Shadow["UnObscured"] = 0] = "UnObscured";
        Shadow[Shadow["None"] = 1] = "None";
        Shadow[Shadow["Obscured"] = 2] = "Obscured";
    })(Shadow || (Shadow = {}));
    const Shadows = {
        of(oneBasedOrdinal) {
            return Shadow.None;
        }
    };
    const Block = {
        of(block) {
            const { opcode, next, parent, comment, inputs, fields, shadow, topLevel, x, y, mutation, } = block;
            if (mutation) {
                throw new Error(`mutations not supported: ${mutation}`);
            }
            return {
                op_code: OpCode.of(opcode),
                next
            };
        }
    };
    const Comment = {
        of(comment) {
            const { blockId, text, minimized, x, y } = comment;
            const xValid = (!!x || x === 0);
            const yValid = (!!y || y === 0);
            const xyValid = xValid && yValid;
            if (!xyValid) {
                if (xValid || yValid) {
                    throw new Error(`(x, y) = (${x}, ${y}) must both be numbers or nothing`);
                }
                else {
                    throw new Error(`(x, y) = (${x}, ${y}) must exist`);
                }
            }
            return {
                block: blockId,
                text,
                minimized,
                position: { x: x, y: y },
            };
        },
    };
    const Target = {
        of(target) {
        },
    };
    let VideoState;
    (function (VideoState) {
        VideoState[VideoState["On"] = 0] = "On";
        VideoState[VideoState["Off"] = 1] = "Off";
        VideoState[VideoState["OnFlipped"] = 2] = "OnFlipped";
    })(VideoState || (VideoState = {}));
    const VideoStates = {
        of(videoState) {
            switch (videoState) {
                case "on":
                    return VideoState.On;
                case "off":
                    return VideoState.Off;
                case "on-flipped":
                    return VideoState.OnFlipped;
                default:
                    throw new Error(`invalid VideoState: ${videoState}`);
            }
        }
    };
    const Stage = {
        of(stage) {
            const { tempo, videoTransparency, videoState } = stage;
            return {
                target: Target.of(stage),
                tempo,
                video_transparency: videoTransparency,
                video_state: VideoStates.of(videoState),
            };
        },
    };
    let RotationStyle;
    (function (RotationStyle) {
        RotationStyle[RotationStyle["AllAround"] = 0] = "AllAround";
        RotationStyle[RotationStyle["DontRotate"] = 1] = "DontRotate";
        RotationStyle[RotationStyle["LeftRight"] = 2] = "LeftRight";
    })(RotationStyle || (RotationStyle = {}));
    const RotationStyles = {
        of(rotationStyle) {
            switch (rotationStyle) {
                case "all around":
                    return RotationStyle.AllAround;
                case "don't rotate":
                    return RotationStyle.DontRotate;
                case "left-right":
                    return RotationStyle.LeftRight;
                default:
                    throw new Error(`invalid RotationStyle: ${rotationStyle}`);
            }
        }
    };
    const Sprite = {
        of(sprite) {
            const { name, visible, x, y, size, direction, draggable, rotationStyle, layerOrder, } = sprite;
            return {
                target: Target.of(sprite),
                name,
                visible,
                position: { x, y },
                size,
                direction,
                draggable,
                rotation_style: RotationStyles.of(rotationStyle),
                layer_order: layerOrder,
            };
        },
    };
    const Targets = {
        of(targets) {
            const stages = targets.filter(sb3.Target.isStage);
            if (stages.length != 1) {
                throw new Error(`${JSON.stringify(targets)} must have 1 stage`);
            }
            const stage = stages[0];
            const sprites = targets.filter(sb3.Target.isSprite);
            return {
                stage: Stage.of(stage),
                sprites: sprites.map(Sprite.of),
            };
        },
    };
    const SemVer = {
        of(semVer) {
            const [majorString, minorString, patch, ...rest] = semVer.split(".");
            if (rest.length > 0) {
                throw new Error(`${semVer} isn't a valid semver; it has more than 3 parts`);
            }
            const [major, minor] = [majorString, minorString].map(e => parseInt(e));
            [major, minor].forEach(u32 => {
                if (!Number.isInteger(u32)) {
                    throw new Error(`${u32} isn't a valid integer`);
                }
                if (u32 < 0 || u32 >= (Math.pow(2, 32))) {
                    throw new Error(`${u32} isn't a valid u32`);
                }
            });
            return { major, minor, patch };
        },
    };
    const Meta = {
        of({ semver, vm, agent }) {
            return {
                version: SemVer.of(semver),
                vm: SemVer.of(semver),
                user_agent: agent,
            };
        },
    };
})(rust || (rust = {}));
