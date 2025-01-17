/**
 * @file runtime 运行时
 * @author Auto Generated by IconPark
 */

import React, {HTMLAttributes, ReactElement, createContext, useContext, useMemo} from 'react';

// 描边连接类型
export type StrokeLinejoin = 'miter' | 'round' | 'bevel';

// 描边端点类型
export type StrokeLinecap = 'butt' | 'round' | 'square';

// 主题
export type Theme = 'outline' | 'filled' | 'two-tone' | 'multi-color';


// 包裹前的图标属性
export interface ISvgIconProps {

    // 当前图标的唯一Id
    id: string;

    // 图标尺寸大小，默认1em
    size: number | string;

    // 描边宽度
    strokeWidth: number;

    // 描边端点类型
    strokeLinecap: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin;

    // 换肤的颜色数组
    colors: string[];
}

// 图标配置属性
export interface IIconConfig {

    // 图标尺寸大小，默认1em
    size: number | string;

    // 描边宽度
    strokeWidth: number;

    // 描边端点类型
    strokeLinecap: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin;

    // CSS前缀
    prefix: string;

    // RTL是否开启
    rtl: boolean;

    // 默认主题
    theme: Theme;

    // 主题默认颜色
    colors: {

        outline: {
            fill: string;
            background: string;
        };

        filled: {
            fill: string;
            background: string;
        };

        twoTone: {
            fill: string;
            twoTone: string;
        };

        multiColor: {
            outStrokeColor: string;
            outFillColor: string;
            innerStrokeColor: string;
            innerFillColor: string;
        };
    };

    // 唯一ID 生成函数
    guid?: () => string,
}

// 图标基础属性
export interface IIconBase {

    // 图标尺寸大小，默认1em
    size?: number | string;

    // 描边宽度
    strokeWidth?: number;

    // 描边端点类型
    strokeLinecap?: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin?: StrokeLinejoin;

    // 默认主题
    theme?: Theme;

    // 填充色
    fill?: string | string[];
}

// 安全的类型合并
export type Intersection<T, K> = T & Omit<K, keyof T>;

// 包裹后的图标非扩展属性
export interface IIcon extends IIconBase {
    spin?: boolean;
}

// 包裹后的图标属性
export type IIconProps = Intersection<IIcon, HTMLAttributes<HTMLSpanElement>>;

// 包裹前的图标
export type IconRender = (props: ISvgIconProps) => ReactElement;

// 包裹后的图标
export type Icon = (props: IIconProps) => ReactElement;

// 默认属性
export const DEFAULT_ICON_CONFIGS: IIconConfig = {
    size: '1em',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    rtl: false,
    theme: 'outline',
    colors: {
        outline: {
            fill: '#333',
            background: 'transparent'
        },
        filled: {
            fill: '#333',
            background: '#FFF'
        },
        twoTone: {
            fill: '#333',
            twoTone: '#2F88FF'
        },
        multiColor: {
            outStrokeColor: '#333',
            outFillColor: '#2F88FF',
            innerStrokeColor: '#FFF',
            innerFillColor: '#43CCF8'
        }
    },
    prefix: 'i'
};

function guid(): string {
    return 'icon-' + (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
}

// 属性转换函数
export function IconConverter(id: string, icon: IIconBase, config: IIconConfig): ISvgIconProps {

    const fill = typeof icon.fill === 'string' ? [icon.fill] : icon.fill || [];
    const colors: string[] = [];

    const theme: Theme = icon.theme || config.theme;

    switch (theme) {
        case 'outline':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('none');
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('none');
            break;
        case 'filled':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('#FFF');
            colors.push('#FFF');
            break;
        case 'two-tone':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
            break;
        case 'multi-color':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.multiColor.outFillColor);
            colors.push(typeof fill[2] === 'string' ? fill[2] : config.colors.multiColor.innerStrokeColor);
            colors.push(typeof fill[3] === 'string' ? fill[3] : config.colors.multiColor.innerFillColor);
            break;
    }

    return {
        size: icon.size || config.size,
        strokeWidth: icon.strokeWidth || config.strokeWidth,
        strokeLinecap: icon.strokeLinecap || config.strokeLinecap,
        strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin,
        colors,
        id
    };
}

// 图标配置Context
const IconContext = createContext(DEFAULT_ICON_CONFIGS);

// 图标配置Provider
export const IconProvider = IconContext.Provider;

// 图标Wrapper
export function IconWrapper(name: string, rtl: boolean, render: IconRender): Icon {

    return (props: IIconProps) => {

        const {
            size,
            strokeWidth,
            strokeLinecap,
            strokeLinejoin,
            theme,
            fill,
            className,
            spin,
            ...extra
        } = props;

        const ICON_CONFIGS = useContext(IconContext);

        let id = guid();
        if (ICON_CONFIGS.guid && typeof ICON_CONFIGS.guid == 'function') {
            id = ICON_CONFIGS.guid();
        }

        const svgProps = IconConverter(id, {
            size,
            strokeWidth,
            strokeLinecap,
            strokeLinejoin,
            theme,
            fill
        }, ICON_CONFIGS);

        const cls: string[] = [ICON_CONFIGS.prefix + '-icon'];

        cls.push(ICON_CONFIGS.prefix + '-icon' + '-' + name);

        if (rtl && ICON_CONFIGS.rtl) {
            cls.push(ICON_CONFIGS.prefix + '-icon-rtl');
        }

        if (spin) {
            cls.push(ICON_CONFIGS.prefix + '-icon-spin');
        }
        if (className) {
            cls.push(className);
        }

        return (
            <span {...extra} className={cls.join(' ')}>
                {render(svgProps)}
            </span>
        );
    };
}
