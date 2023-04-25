import type { ConditionalValue, Conditions, Nested } from './conditions'
import type { PropertiesFallback } from './csstype'
import type { SystemProperties } from './style-props'

type String = string & {}
type Number = number & {}

/* -----------------------------------------------------------------------------
 * Native css properties
 * -----------------------------------------------------------------------------*/

type CssVarProperties = {
  [key in `--${string}`]?: string | number
}

export type NativeCssProperties = PropertiesFallback<String | Number>

export type NativeCssProperty = keyof NativeCssProperties

export type CssProperties = NativeCssProperties & CssVarProperties

export type CssKeyframes = {
  [name: string]: {
    [time: string]: CssProperties
  }
}

/* -----------------------------------------------------------------------------
 * Conditional css properties
 * -----------------------------------------------------------------------------*/

type MinimalNested<P> = {
  [K in keyof Conditions]?: Nested<P>
}

type GenericProperties = {
  [key: string]: ConditionalValue<String | Number | boolean>
}

/* -----------------------------------------------------------------------------
 * Native css props
 * -----------------------------------------------------------------------------*/

export type NestedCssProperties = Nested<CssProperties>

export type SystemStyleObject = Nested<SystemProperties | GenericProperties>

export type GlobalStyleObject = {
  [selector: string]: SystemStyleObject
}

export type CompositionStyleObject<Property extends string> = Nested<{
  [K in Property]?: K extends keyof SystemStyleObject ? SystemStyleObject[K] : unknown
}>

/* -----------------------------------------------------------------------------
 * Jsx style props
 * -----------------------------------------------------------------------------*/

export type JsxStyleProps = SystemProperties &
  MinimalNested<SystemStyleObject> & {
    css?: SystemStyleObject
  }

type Assign<T, U> = Omit<T, keyof U> & U

type HTMLProps = {
  htmlSize?: string | number
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: 'yes' | 'no' | undefined
}

type WithHTMLProps<T> = Omit<T, 'color' | 'translate' | 'transition' | 'width' | 'height' | 'size'> & HTMLProps

export type JsxHTMLProps<T extends Record<string, any>, P extends Record<string, any> = {}> = Assign<
  WithHTMLProps<T>,
  P
>