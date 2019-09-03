import { mapFields, mapFieldsIndexed } from "./mapFields";
import { sb3 } from "./sb3";
export var rust;
(function (rust) {
    function hexToRaw(hex) {
        let s = "";
        for (let i = 0; i < hex.length; i += 2) {
            const c = parseInt(`0x${hex.slice(i, i + 2)}`);
            s += String.fromCharCode(c);
        }
        return s;
    }
    const AssetId = {
        of(assetId) {
            return hexToRaw(assetId);
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
    let opCode;
    (function (opCode_1) {
        let Kind;
        (function (Kind) {
            Kind[Kind["Motion"] = 0] = "Motion";
            Kind[Kind["Look"] = 1] = "Look";
            Kind[Kind["Sound"] = 2] = "Sound";
            Kind[Kind["Event"] = 3] = "Event";
            Kind[Kind["Control"] = 4] = "Control";
            Kind[Kind["Sensing"] = 5] = "Sensing";
            Kind[Kind["Operator"] = 6] = "Operator";
            Kind[Kind["Data"] = 7] = "Data";
            Kind[Kind["Block"] = 8] = "Block";
        })(Kind || (Kind = {}));
        const Kinds = {
            map: {
                motion: Kind.Motion,
                looks: Kind.Look,
                sound: Kind.Sound,
                event: Kind.Event,
                control: Kind.Control,
                sensing: Kind.Sensing,
                operator: Kind.Operator,
                data: Kind.Data,
                procedures: Kind.Block,
            },
            of(sb3Kind) {
                const kind = Kinds.map[sb3Kind];
                // kind could be a 0 enum, so could be falsy
                if (kind === undefined) {
                    throw new Error(`invalid OpCode kind: ${kind}`);
                }
                return kind;
            },
        };
        let Motion;
        (function (Motion) {
        })(Motion || (Motion = {}));
        const _Motion = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Look;
        (function (Look) {
        })(Look || (Look = {}));
        const _Look = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Sound;
        (function (Sound) {
        })(Sound || (Sound = {}));
        const _Sound = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Event;
        (function (Event) {
        })(Event || (Event = {}));
        const _Event = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Control;
        (function (Control) {
        })(Control || (Control = {}));
        const _Control = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Sensing;
        (function (Sensing) {
        })(Sensing || (Sensing = {}));
        const _Sensing = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Operator;
        (function (Operator) {
        })(Operator || (Operator = {}));
        const _Operator = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Data;
        (function (Data) {
        })(Data || (Data = {}));
        const _Data = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        let Block;
        (function (Block) {
        })(Block || (Block = {}));
        const _Block = {
            of(opCode) {
                switch (opCode) {
                }
            },
        };
        const _op = {};
        opCode_1.OpCode = {
            of(fullOpCode) {
                const i = fullOpCode.indexOf("_");
                if (i === -1) {
                    throw new Error(`invalid OpCode: ${fullOpCode}`);
                }
                const kind = Kinds.of(fullOpCode.slice(0, i));
                const opCode = fullOpCode.slice(i);
                switch (kind) {
                    case Kind.Motion:
                        return { kind, op_code: _Motion.of(opCode) };
                    case Kind.Look:
                        return { kind, op_code: _Look.of(opCode) };
                    case Kind.Sound:
                        return { kind, op_code: _Sound.of(opCode) };
                    case Kind.Event:
                        return { kind, op_code: _Event.of(opCode) };
                    case Kind.Control:
                        return { kind, op_code: _Control.of(opCode) };
                    case Kind.Sensing:
                        return { kind, op_code: _Sensing.of(opCode) };
                    case Kind.Operator:
                        return { kind, op_code: _Operator.of(opCode) };
                    case Kind.Data:
                        return { kind, op_code: _Data.of(opCode) };
                    case Kind.Block:
                        return { kind, op_code: _Block.of(opCode) };
                }
            },
        };
    })(opCode || (opCode = {}));
    var OpCode = opCode.OpCode;
    const Color = {
        of(color) {
            return parseInt(`0x${color.slice(1)}`);
        },
    };
    const Primitive = {
        of(primitive) {
            const discriminant = primitive[0];
            switch (discriminant) {
                case 4:
                case 5:
                case 6:
                case 7:
                // @ts-ignore
                case 8: {
                    const [_, value] = primitive;
                    return { kind: "Num", value };
                }
                case 9: {
                    const [_, value] = primitive;
                    return { kind: "Color", value: Color.of(value) };
                }
                case 10: {
                    const [_, value] = primitive;
                    if (typeof value !== "string") {
                        throw new TypeError(`value \`${value}\` of TextPrimitive \`${primitive}\``);
                    }
                    return { kind: "Text", value };
                }
                case 11:
                case 12:
                case 13: {
                    const [_, name, id, x, y] = primitive;
                    const types = {
                        11: "Broadcast",
                        12: "Scalar",
                        13: "List",
                    };
                    if ((!x && x !== 0) || (!y && y !== 0)) {
                        throw new Error(`[x, y] \`[${x}, ${y}]\` must both be defined in ${{
                            11: "Broadcast",
                            12: "Variable",
                            13: "List",
                        }[discriminant]}Primitive \`${primitive}\``);
                    }
                    return {
                        kind: "Variable",
                        type: types[discriminant],
                        name,
                        id,
                        position: { x, y },
                    };
                }
                default:
                    throw new Error(`${discriminant} is not a valid InputPrimitive discriminant`);
            }
        }
    };
    let Shadow;
    (function (Shadow) {
        Shadow[Shadow["UnObscured"] = 0] = "UnObscured";
        Shadow[Shadow["None"] = 1] = "None";
        Shadow[Shadow["Obscured"] = 2] = "Obscured";
    })(Shadow || (Shadow = {}));
    const Shadows = {
        of(shadow) {
            return Shadow[shadow - 1];
        },
    };
    const Input = {
        of(input) {
            const [shadow, ...args] = input;
            return {
                shadow: Shadows.of(shadow),
                args: args.map((arg, i) => {
                    const cantBe = (type) => {
                        return new TypeError(`argument ${i} of ${args} can't be ${type}`);
                    };
                    switch (typeof arg) {
                        case "number":
                            return { kind: "Num", value: arg };
                        case "string":
                            return { kind: "Text", value: arg };
                        case "object":
                            if (arg === null) {
                                throw cantBe("null");
                            }
                            return Primitive.of(arg);
                        default:
                            throw cantBe(typeof arg);
                    }
                }),
            };
        }
    };
    const Field = {
        of(field) {
            return field;
        },
    };
    const Block = {
        using(getIndex) {
            return block => {
                const { opcode, next, parent, comment, inputs, fields, shadow, topLevel, x, y, mutation, } = block;
                if (mutation) {
                    throw new Error(`mutations not supported in Block: ${mutation}`);
                }
                return {
                    op_code: OpCode.of(opcode),
                    next: getIndex(next),
                    parent: getIndex(parent),
                    comment,
                    inputs: mapFields(inputs, Input.of),
                    fields: mapFields(fields, Field.of),
                    shadow,
                    top_level: topLevel,
                    position: { x, y },
                };
            };
        },
    };
    const IndexedBlocks = {
        of(blocks) {
            const indexed = mapFieldsIndexed(blocks, (block, i) => {
                if (Array.isArray(block)) {
                    throw new Error(`TopLevelPrimitive \`${block}\` is not supported`);
                }
                return Object.assign(Object.assign({}, block), { i });
            });
            return {
                blocks: Object.values(indexed),
                getIndex(key) {
                    const block = key && indexed[key];
                    return block ? block.i : -1;
                },
            };
        }
    };
    const Comment = {
        using(getIndex) {
            return comment => {
                const { blockId, text, minimized, x, y, width, height } = comment;
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
                    block: getIndex(blockId),
                    text,
                    minimized,
                    position: { x: x, y: y },
                    size: { x: width, y: height },
                };
            };
        },
    };
    const Variable = {
        of(variable) {
            if (Array.isArray(variable)) {
                const [name, value, on_cloud = false] = variable;
                return {
                    name,
                    value: Array.isArray(value) ? {
                        kind: "List",
                        value: value.map(Variable.of).map(e => e.value),
                    } : {
                        kind: "Scalar",
                        value,
                    },
                    on_cloud,
                };
            }
            else {
                const name = variable;
                return {
                    name,
                    value: {
                        kind: "Broadcast",
                        value: { name },
                    },
                    on_cloud: false,
                };
            }
        },
    };
    const Target = {
        of(target) {
            const { currentCostume, blocks, variables, lists, broadcasts, comments, costumes, sounds, volume, } = target;
            const { blocks: indexedBlocks, getIndex } = IndexedBlocks.of(blocks);
            return {
                current_costume: currentCostume,
                blocks: indexedBlocks.map(Block.using(getIndex)),
                variables: [variables, lists, broadcasts].flatMap(Object.values).map(Variable.of),
                comments: Object.values(comments).map(Comment.using(getIndex)),
                costumes: costumes.map(Costume.of),
                sounds: sounds.map(Sound.of),
                volume,
            };
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
    rust.Sprite = {
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
                sprites: sprites.map(rust.Sprite.of),
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
                vm: SemVer.of(vm),
                user_agent: agent,
            };
        },
    };
    rust.Project = {
        of({ targets, meta }) {
            return {
                targets: Targets.of(targets),
                meta: Meta.of(meta),
            };
        },
    };
})(rust || (rust = {}));
