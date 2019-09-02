import {mapFields, mapFieldsIndexed} from "./mapFields";
import {sb3} from "./sb3";

export namespace rust {
    
    type Index = number;
    
    interface Vec2 {
        x: number;
        y: number;
    }
    
    type AssetId = string; // compression easier on Rust side
    
    const AssetId = {
        of(assetId: sb3.AssetId): AssetId {
            return assetId;
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
    
    enum BlockCategory {
        Motion, Look, Sound, Event, Control, Sensing, Operator, Variable, Block,
    }
    
    enum MotionOpCode {
        
    }
    
    enum LookOpCode {
        
    }
    
    enum SoundOpCode {
        
    }
    
    enum EventOpCode {
        
    }
    
    enum ControlOpCode {
        
    }
    
    enum SensingOpCode {
        
    }
    
    enum OperatorOpCode {
        
    }
    
    enum VariableOpCode {
        
    }
    
    enum BlockOpCode {
        
    }
    
    interface _MotionOpCode {
        category: BlockCategory.Motion;
        op_code: MotionOpCode;
    }
    
    interface _LookOpCode {
        category: BlockCategory.Look;
        op_code: LookOpCode;
    }
    
    interface _SoundOpCode {
        category: BlockCategory.Sound;
        op_code: SoundOpCode;
    }
    
    interface _EventOpCode {
        category: BlockCategory.Event;
        op_code: EventOpCode;
    }
    
    interface _ControlOpCode {
        category: BlockCategory.Control;
        op_code: ControlOpCode;
    }
    
    interface _SensingOpCode {
        category: BlockCategory.Sensing;
        op_code: SensingOpCode;
    }
    
    interface _OperatorOpCode {
        category: BlockCategory.Operator;
        op_code: OperatorOpCode;
    }
    
    interface _VariableOpCode {
        category: BlockCategory.Variable;
        op_code: VariableOpCode;
    }
    
    interface _BlockOpCode {
        category: BlockCategory.Block;
        op_code: BlockOpCode;
    }
    
    type OpCode = _MotionOpCode | _LookOpCode | _SoundOpCode | _EventOpCode | _ControlOpCode | _SensingOpCode
        | _OperatorOpCode | _VariableOpCode | _BlockOpCode;
    
    const OpCode = {
        of(opCode: sb3.OpCode): OpCode {
            // TODO
        },
    } as const;
    
    interface NumPrimitive {
        kind: "Num";
        value: number | string;
    }
    
    interface Color {
        // TODO
    }
    
    const Color = {
        of(color: sb3.Color): Color {
            // TODO
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
    
    type Primitive = NumPrimitive | ColorPrimitive | TextPrimitive | VariablePrimitive;
    
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
        of(input: sb3.Input): Input {
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
                            return {kind: "Text", value: arg};
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
    } as const;
    
    interface Field {
        // TODO
    }
    
    const Field = {
        of(field: sb3.Field): Field {
            // TODO
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
        of(block: sb3.Block, getIndex: (block: string | null) => Index): Block {
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
                inputs: mapFields(inputs, Input.of),
                fields: mapFields(fields, Field.of),
                shadow,
                top_level: topLevel,
                position: {x, y},
            };
        },
    } as const;
    
    const Blocks = {
        of(blocks: sb3.Blocks): readonly Block[] {
            type IndexedBlocks = Record<string, sb3.Block & {i: number}>;
            const indexedBlocks: IndexedBlocks = mapFieldsIndexed(blocks, (block, i) => {
                if (Array.isArray(block)) {
                    throw new Error(`TopLevelPrimitive \`${block}\` is not supported`);
                }
                return {...block, i};
            });
            return Object.values(indexedBlocks)
                .map(block => Block.of(block, key => {
                    const block = key && indexedBlocks[key];
                    return block ? block.i : -1;
                }));
        }
    } as const;
    
    interface Comment {
        block: Index;
        text: string;
        minimized: boolean;
        position: Vec2;
    }
    
    const Comment = {
        of(comment: sb3.Comment): Comment {
            const {blockId, text, minimized, x, y} = comment;
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
                block: blockId,
                text,
                minimized,
                position: {x: x as number, y: y as number},
            };
        },
    } as const;
    
    interface Target {
        current_costume: Index;
        blocks: Block[];
        variables: Variable[];
        lists: List[];
        broadcasts: Broadcast[];
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
            return {
                current_costume: currentCostume,
                blocks: [],
                variables: [],
                lists: [],
                broadcasts: [],
                comments: [],
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
    
    interface Sprite {
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
    
    const Sprite = {
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
