import {mapFields, mapFieldsIndexed} from "./mapFields";
import {sb3} from "./sb3";

export namespace rust {
    
    type Index = number;
    
    interface Vec2 {
        x: number;
        y: number;
    }
    
    function hexToRaw(hex: string): string {
        let s = "";
        for (let i = 0; i < hex.length; i += 2) {
            const c = parseInt(hex.slice(i, i + 2), 16);
            s += String.fromCharCode(c);
        }
        return s;
    }
    
    type AssetId = string;
    
    const AssetId = {
        of(assetId: sb3.AssetId): AssetId {
            return hexToRaw(assetId);
        },
    } as const;
    
    enum ImageDataFormat {
        PNG, SVG, JPEG, JPG, BMP, GIF,
    }
    
    const ImageDataFormats = {
        of(dataFormat: sb3.ImageDataFormat): ImageDataFormat {
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
    } as const;
    
    enum AudioDataFormat {
        WAV, WAVE, MP3,
    }
    
    const AudioDataFormats = {
        of(dataFormat: sb3.AudioDataFormat): AudioDataFormat {
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
    } as const;
    
    interface Asset<DataFormat> {
        asset_id: AssetId;
        data_format: DataFormat;
        name: string;
    }
    
    const Asset = {
        check(asset: sb3.Asset<unknown>) {
            const {assetId, dataFormat, md5Ext} = asset;
            if (`${assetId}.${dataFormat}` !== md5Ext) {
                throw new Error(
                    `${"`${assetId}.${dataFormat}`"} !== md5Ext: "${assetId}.${dataFormat}" !== "${md5Ext}"`);
            }
        },
    } as const;
    
    interface Costume {
        asset: Asset<ImageDataFormat>;
        bitmap_resolution: number;
        rotation_center: Vec2;
    }
    
    const Costume = {
        of(costume: sb3.Costume): Costume {
            Asset.check(costume);
            const {assetId, name, dataFormat, md5Ext} = costume;
            const {bitmapResolution, rotationCenterX, rotationCenterY} = costume;
            return {
                asset: {
                    asset_id: AssetId.of(assetId),
                    data_format: ImageDataFormats.of(dataFormat),
                    name,
                },
                bitmap_resolution: bitmapResolution,
                rotation_center: {x: rotationCenterX, y: rotationCenterY},
            };
        },
    } as const;
    
    interface Sound {
        asset: Asset<AudioDataFormat>;
        rate: number;
        sample_count: number;
    }
    
    const Sound = {
        of(sound: sb3.Sound): Sound {
            Asset.check(sound);
            const {assetId, name, dataFormat, md5Ext} = sound;
            const {rate, sampleCount} = sound;
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
    } as const;
    
    namespace opCode {
        
        enum Kind {
            Motion, Look, Sound, Event, Control, Sensing, Operator, Data, Block,
        }
        
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
            } as const,
            
            of(sb3Kind: string): Kind {
                const kind = Kinds.map[sb3Kind as keyof typeof Kinds.map];
                // kind could be a 0 enum, so could be falsy
                if (kind === undefined) {
                    throw new Error(`invalid OpCode kind: ${kind}`);
                }
                return kind;
            },
            
        } as const;
        
        enum Motion {
        
        }
        
        const _Motion = {
            of(opCode: string): Motion {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Look {
        
        }
        
        const _Look = {
            of(opCode: string): Look {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Sound {
        
        }
        
        const _Sound = {
            of(opCode: string): Sound {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Event {
        
        }
        
        const _Event = {
            of(opCode: string): Event {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Control {
        
        }
        
        const _Control = {
            of(opCode: string): Control {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Sensing {
        
        }
        
        const _Sensing = {
            of(opCode: string): Sensing {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Operator {
        
        }
        
        const _Operator = {
            of(opCode: string): Operator {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Data {
        
        }
        
        const _Data = {
            of(opCode: string): Data {
                switch (opCode) {
                
                }
            },
        } as const;
        
        enum Block {
        
        }
        
        const _Block = {
            of(opCode: string): Block {
                switch (opCode) {
                
                }
            },
        } as const;
        
        interface _Motion {
            kind: Kind.Motion;
            op_code: Motion;
        }
        
        interface _Look {
            kind: Kind.Look;
            op_code: Look;
        }
        
        interface _Sound {
            kind: Kind.Sound;
            op_code: Sound;
        }
        
        interface _Event {
            kind: Kind.Event;
            op_code: Event;
        }
        
        interface _Control {
            kind: Kind.Control;
            op_code: Control;
        }
        
        interface _Sensing {
            kind: Kind.Sensing;
            op_code: Sensing;
        }
        
        interface _Operator {
            kind: Kind.Operator;
            op_code: Operator;
        }
        
        interface _Data {
            kind: Kind.Data;
            op_code: Data;
        }
        
        interface _Block {
            kind: Kind.Block;
            op_code: Block;
        }
        
        export type OpCode = _Motion | _Look | _Sound | _Event | _Control | _Sensing
            | _Operator | _Data | _Block;
        
        const _op: OpCode = {} as any;
        
        export const OpCode = {
            
            of(fullOpCode: sb3.OpCode): OpCode {
                const i = fullOpCode.indexOf("_");
                if (i === -1) {
                    throw new Error(`invalid OpCode: ${fullOpCode}`);
                }
                const kind = Kinds.of(fullOpCode.slice(0, i));
                const opCode = fullOpCode.slice(i);
                switch (kind) {
                    case Kind.Motion:
                        return {kind, op_code: _Motion.of(opCode)};
                    case Kind.Look:
                        return {kind, op_code: _Look.of(opCode)};
                    case Kind.Sound:
                        return {kind, op_code: _Sound.of(opCode)};
                    case Kind.Event:
                        return {kind, op_code: _Event.of(opCode)};
                    case Kind.Control:
                        return {kind, op_code: _Control.of(opCode)};
                    case Kind.Sensing:
                        return {kind, op_code: _Sensing.of(opCode)};
                    case Kind.Operator:
                        return {kind, op_code: _Operator.of(opCode)};
                    case Kind.Data:
                        return {kind, op_code: _Data.of(opCode)};
                    case Kind.Block:
                        return {kind, op_code: _Block.of(opCode)};
                }
            },
            
        } as const;
        
    }
    
    import OpCode = opCode.OpCode;
    
    interface NumPrimitive {
        kind: "Num";
        value: number | string;
    }
    
    type Color = number; // RGB integer
    
    const Color = {
        of(color: sb3.Color): Color {
            return parseInt(color.slice(1), 16);
        },
    } as const;
    
    interface ColorPrimitive {
        kind: "Color";
        value: Color;
    }
    
    interface TextPrimitive {
        kind: "Text";
        value: string;
    }
    
    type VariableType = "Scalar" | "List" | "Broadcast";
    
    interface VariablePrimitive {
        kind: "Variable";
        type: VariableType;
        name: string;
        id: string;
        position: Vec2;
    }
    
    interface IndexPrimitive {
        kind: "Index";
        value: Index;
    }
    
    type Primitive = NumPrimitive | ColorPrimitive | TextPrimitive | VariablePrimitive | IndexPrimitive;
    
    const Primitive = {
        of(primitive: sb3.InputPrimitive): Primitive {
            const discriminant = primitive[0];
            switch (discriminant) {
                case 4:
                case 5:
                case 6:
                case 7:
                // @ts-ignore
                case 8: {
                    const [_, value] = primitive as sb3.NumPrimitive;
                    return {kind: "Num", value};
                }
                case 9: {
                    const [_, value] = primitive as sb3.ColorPrimitive;
                    return {kind: "Color", value: Color.of(value)};
                }
                case 10: {
                    const [_, value] = primitive as sb3.TextPrimitive;
                    if (typeof value !== "string") {
                        throw new TypeError(`value \`${value}\` of TextPrimitive \`${primitive}\``);
                    }
                    return {kind: "Text", value};
                }
                case 11:
                case 12:
                case 13: {
                    const [_, name, id, x, y] = primitive as sb3.BroadcastPrimitive | sb3.VariablePrimitive | sb3.ListPrimitive;
                    const types: Record<11 | 12 | 13, VariableType> = {
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
                        position: {x, y},
                    };
                }
                default:
                    throw new Error(`${discriminant} is not a valid InputPrimitive discriminant`);
            }
        }
    } as const;
    
    enum Shadow {
        UnObscured, None, Obscured,
    }
    
    const Shadows = {
        of(shadow: sb3.Shadow): Shadow {
            return (Shadow as unknown as Record<number, Shadow>)[shadow - 1];
        },
    } as const;
    
    interface Input {
        shadow: Shadow;
        args: Primitive[];
    }
    
    const Input = {
        using(getIndex: GetBlockIndex): (input: sb3.Input) => Input {
            return input => {
                const [shadow, ...args] = input;
                return {
                    shadow: Shadows.of(shadow),
                    args: args.map((arg, i): Primitive => {
                        const cantBe = (type: string) => {
                            return new TypeError(`argument ${i} of ${args} can't be ${type}`);
                        };
                        switch (typeof arg) {
                            case "number":
                                return {kind: "Num", value: arg};
                            case "string":
                                return {kind: "Index", value: getIndex(arg)};
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
            };
        }
    } as const;
    
    type Field = unknown;
    
    const Field = {
        of(field: sb3.Field): Field {
            return field;
        },
    } as const;
    
    interface Block {
        op_code: OpCode;
        next: Index;
        parent: Index;
        comment?: string;
        inputs: Record<string, Input>;
        fields: Record<string, Field>;
        shadow: boolean;
        top_level: boolean;
        position: Vec2;
        // no mutation field
    }
    
    const Block = {
        using(getIndex: GetBlockIndex): (block: sb3.Block) => Block {
            return block => {
                const {
                    opcode,
                    next,
                    parent,
                    comment,
                    inputs,
                    fields,
                    shadow,
                    topLevel,
                    x,
                    y,
                    mutation,
                } = block;
                if (mutation) {
                    throw new Error(`mutations not supported in Block: ${mutation}`);
                }
                return {
                    op_code: OpCode.of(opcode),
                    next: getIndex(next),
                    parent: getIndex(parent),
                    comment,
                    inputs: mapFields(inputs, Input.using(getIndex)),
                    fields: mapFields(fields, Field.of),
                    shadow,
                    top_level: topLevel,
                    position: {x, y},
                };
            };
        },
    } as const;
    
    type Blocks = Block[];
    
    type GetBlockIndex = (key: string | null) => Index;
    
    interface IndexedBlocks {
        blocks: sb3.Block[];
        getIndex: GetBlockIndex;
    }
    
    const IndexedBlocks = {
        of(blocks: sb3.Blocks): IndexedBlocks {
            type Indexed = Record<string, sb3.Block & {i: number}>;
            const indexed: Indexed = mapFieldsIndexed(blocks, (block, i) => {
                if (Array.isArray(block)) {
                    throw new Error(`TopLevelPrimitive \`${block}\` is not supported`);
                }
                return {...block, i};
            });
            return {
                blocks: Object.values(indexed),
                getIndex(key) {
                    const block = key && indexed[key];
                    return block ? block.i : -1;
                },
            };
        }
    } as const;
    
    interface Comment {
        block: Index;
        text: string;
        minimized: boolean;
        position: Vec2;
        size: Vec2;
    }
    
    const Comment = {
        using(getIndex: GetBlockIndex): (comment: sb3.Comment) => Comment {
            return comment => {
                const {blockId, text, minimized, x, y, width, height} = comment;
                const xValid = (!!x || x === 0);
                const yValid = (!!y || y === 0);
                const xyValid = xValid && yValid;
                if (!xyValid) {
                    if (xValid || yValid) {
                        throw new Error(`(x, y) = (${x}, ${y}) must both be numbers or nothing`);
                    } else {
                        throw new Error(`(x, y) = (${x}, ${y}) must exist`);
                    }
                }
                return {
                    block: getIndex(blockId),
                    text,
                    minimized,
                    position: {x: x as number, y: y as number},
                    size: {x: width, y: height},
                };
            };
        },
    } as const;
    
    type ScalarValue = boolean | number | string;
    
    interface Scalar {
        kind: "Scalar";
        value: ScalarValue;
    }
    
    interface List {
        kind: "List";
        value: Value[];
    }
    
    interface Broadcast {
        kind: "Broadcast";
        value: {name: string};
    }
    
    type Value = Scalar | List | Broadcast;
    
    interface Variable {
        name: string;
        value: Value;
        on_cloud: boolean;
    }
    
    const Variable = {
        of(variable: sb3.ScalarVariable | sb3.List | sb3.BroadcastMessage): Variable {
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
            } else {
                const name = variable;
                return {
                    name,
                    value: {
                        kind: "Broadcast",
                        value: {name},
                    },
                    on_cloud: false,
                };
            }
        },
    } as const;
    
    interface Target {
        current_costume: Index;
        blocks: Block[];
        variables: Variable[];
        comments: Comment[];
        costumes: Costume[];
        sounds: Sound[];
        volume: number;
    }
    
    const Target = {
        of(target: sb3.Target): Target {
            const {
                currentCostume,
                blocks,
                variables,
                lists,
                broadcasts,
                comments,
                costumes,
                sounds,
                volume,
            } = target;
            const {blocks: indexedBlocks, getIndex} = IndexedBlocks.of(blocks);
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
    } as const;
    
    enum VideoState {
        On, Off, OnFlipped
    }
    
    const VideoStates = {
        of(videoState: sb3.VideoState): VideoState {
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
    } as const;
    
    interface Stage {
        target: Target;
        tempo: number;
        video_transparency: number;
        video_state: VideoState;
    }
    
    const Stage = {
        of(stage: sb3.Stage): Stage {
            const {tempo, videoTransparency, videoState} = stage;
            return {
                target: Target.of(stage),
                tempo,
                video_transparency: videoTransparency,
                video_state: VideoStates.of(videoState),
            };
        },
    } as const;
    
    enum RotationStyle {
        AllAround, DontRotate, LeftRight,
    }
    
    const RotationStyles = {
        of(rotationStyle: sb3.RotationStyle): RotationStyle {
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
    } as const;
    
    export interface Sprite {
        target: Target,
        name: string;
        visible: boolean;
        position: Vec2;
        size: number;
        direction: number;
        draggable: boolean;
        rotation_style: RotationStyle;
        layer_order: number;
    }
    
    export const Sprite = {
        of(sprite: sb3.Sprite): Sprite {
            const {
                name,
                visible,
                x,
                y,
                size,
                direction,
                draggable,
                rotationStyle,
                layerOrder,
            } = sprite;
            return {
                target: Target.of(sprite),
                name,
                visible,
                position: {x, y},
                size,
                direction,
                draggable,
                rotation_style: RotationStyles.of(rotationStyle),
                layer_order: layerOrder,
            };
        },
    } as const;
    
    interface Targets {
        stage: Stage;
        sprites: Sprite[];
    }
    
    const Targets = {
        of(targets: sb3.Targets): Targets {
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
    } as const;
    
    interface SemVer {
        major: number;
        minor: number;
        patch: string;
    }
    
    const SemVer = {
        of(semVer: string): SemVer {
            const [majorString, minorString, patch, ...rest] = semVer.split(".");
            if (rest.length > 0) {
                throw new Error(`${semVer} isn't a valid semver; it has more than 3 parts`);
            }
            const [major, minor] = [majorString, minorString].map(e => parseInt(e));
            [major, minor].forEach(u32 => {
                if (!Number.isInteger(u32)) {
                    throw new Error(`${u32} isn't a valid integer`);
                }
                if (u32 < 0 || u32 >= (2 ** 32)) {
                    throw new Error(`${u32} isn't a valid u32`);
                }
            });
            return {major, minor, patch};
        },
    } as const;
    
    interface Meta {
        version: SemVer;
        vm: SemVer;
        user_agent: string;
    }
    
    const Meta = {
        of({semver, vm, agent}: sb3.Meta): Meta {
            return {
                version: SemVer.of(semver),
                vm: SemVer.of(vm),
                user_agent: agent,
            };
        },
    } as const;
    
    export interface Project {
        targets: Targets;
        meta: Meta;
    }
    
    export const Project = {
        of({targets, meta}: sb3.Project): Project {
            return {
                targets: Targets.of(targets),
                meta: Meta.of(meta),
            };
        },
    } as const;
    
}
