export namespace sb3 {
    
    export type BoolOrOptBoolString = string | boolean | null | "true" | "false" | "null";
    
    export type AssetId = string;
    
    export type ImageDataFormat = "png" | "svg" | "jpeg" | "jpg" | "bmp" | "gif";
    export type AudioDataFormat = "wav" | "wave" | "mp3";
    
    export interface Asset<DataFormat> {
        assetId: AssetId;
        name: string;
        dataFormat: DataFormat;
        md5Ext: string;
    }
    
    export interface Costume extends Asset<ImageDataFormat> {
        bitmapResolution: number;
        rotationCenterX: number;
        rotationCenterY: number;
    }
    
    export interface Sound extends Asset<AudioDataFormat> {
        rate: number;
        sampleCount: number;
    }
    
    export type ScalarValue = string | number | boolean;
    
    export type ScalarVariable = [string, ScalarValue] | [string, ScalarValue, true];
    
    export type List = [string, ScalarVariable[]];
    
    export type BroadcastMessage = string;
    
    export type NumPrimitive = [4 | 5 | 6 | 7 | 8, string | number];
    
    export type Color = string;
    
    export type ColorPrimitive = [9, Color];
    
    export type TextPrimitive = [10, string | number];
    
    export type BroadcastPrimitive = [11, string, string];
    
    export type VariablePrimitive = [12, string, string] | [12, string, string, number, number];
    
    export type ListPrimitive = [13, string, string] | [13, string, string, number, number];
    
    export type TopLevelPrimitive = VariablePrimitive | ListPrimitive;
    
    export type InputPrimitive = NumPrimitive | ColorPrimitive | TextPrimitive | BroadcastPrimitive | TopLevelPrimitive;
    
    export type OpCode = string;
    
    export type Shadow = 1 | 2 | 3;
    
    export interface Input extends Array<number | string | null | InputPrimitive> {
        0: Shadow;
    }
    
    export type Field = unknown;
    
    export interface Block {
		opcode: OpCode;
		next: string | null;
		parent: string | null;
		comment?: string;
		inputs: Record<string, Input>;
		fields: Record<string, Field>;
		shadow: boolean;
		topLevel: boolean;
        x: number;
        y: number;
        mutation?: {
            tagName: "mutation";
            children: any[];
            proccode: string;
            argumentids: string;
            warp: BoolOrOptBoolString;
            hasnext: BoolOrOptBoolString;
        };
    }
    
    export type Blocks = Record<string, Block | TopLevelPrimitive>;
    
    export interface Comment {
        blockId: string | null;
        text: string;
        minimized: boolean;
        x: number | null;
        y: number | null;
    }
    
    export interface Target {
        currentCostume: number;
        blocks: Record<string, Block | TopLevelPrimitive>;
        variables: Record<string, ScalarVariable>;
        lists: Record<string, List>;
        broadcasts: Record<string, BroadcastMessage>;
        comments: Record<string, Comment>;
        costumes: Costume[];
        sounds: Sound[];
        volume: number;
    }
    
    export const Target = {
        isStage(target: AnyTarget): target is Stage {
            return target.isStage;
        },
        isSprite(target: AnyTarget): target is Sprite {
            return !target.isStage;
        },
    } as const;
    
    export type VideoState = "on" | "off" | "on-flipped";
    
    export interface Stage extends Target {
        name: "Stage";
        isStage: true;
        tempo: number;
        videoTransparency: number;
        videoState: VideoState;
        layerOrder: 0;
    }
    
    export type RotationStyle = "all around" | "don't rotate" | "left-right";
    
    export interface Sprite extends Target {
        name: string;
        isStage: false;
        visible: boolean;
        x: number;
        y: number;
        size: number;
        direction: number;
        draggable: boolean;
        rotationStyle: RotationStyle;
        layerOrder: number;
    }
    
    export type AnyTarget = Stage | Sprite;
    export type Targets = AnyTarget[];
    
    export interface Meta {
        semver: string;
        vm: string;
        agent: string;
    }
    
    export interface Project {
        targets: Targets;
        meta: Meta;
    }
    
}