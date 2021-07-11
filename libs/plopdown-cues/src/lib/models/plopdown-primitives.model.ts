/**
 * A bounded percentage relative to the container.
 *
 * @minimum -100
 * @maximum 1000
 */
export type Percentage = number;

/**
 * Number representing duration in seconds, precision allowed down to milliseconds.
 *
 * @minimum 0
 * @multipleOf 0.001
 */
export type Seconds = number;

/**
 * Degrees for rotation of elements.
 *
 * @minimum -360
 * @maximum 360
 */
export type Degree = number;

/**
 * The location of a file.
 */
export type URIReference = string;

/**
 * A short statement.
 *
 * @minLength 2
 * @maxLength 256
 */
export type Title = string;

/**
 * A medium long description
 *
 * @minLength 2
 * @maxLength 1024
 */
export type Description = string;

/**
 * An author to attribute composition to.
 *
 * @minLength 2
 * @maxLength 128
 */
export type Author = string;

/**
 * An external URL to get more information.
 */
export type ExternalLink = string;

/**
 * A single emoji character, ligatures mean the max length
 * can be up to 3 characters.
 *
 * @minLength 1
 * @maxLength 32
 */
export type Emoji = string;

/**
 * A hex, hsl, hsla or rgba color string:
 * #FA9, #FFAA99, rgba(1, 1, 2, 0.5)
 *
 * @pattern ^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$
 */
export type Color = string;

/**
 * A normalized opacity ranged between 0.0 and 1.0
 *
 * @minimum 0
 * @maximum 1
 */
export type Opacity = number;

/**
 * A dash array in the form of "2 3 4"
 *
 * @pattern ^([0-9]+\s)+[0-9]+$
 */
export type DashArray = string;

/**
 * An integer representing the dash offset of a stroke.
 *
 * @minimum -100
 * @maximum 100
 * @asType integer
 */
export type DashOffset = number;

/**
 * A short css transform string.
 *
 * @minLength 2
 * @maxLength 128
 */
export type Transform = string;

/**
 * A transform origin string.
 *
 * @minLength 2
 * @maxLength 128
 */
export type TransformOrigin = string;

/**
 * An integer representing the dash offset of a stroke.
 *
 * @minimum 0
 */
export type ViewportCoordinate = number;

/**
 * The "d" parameter of an svg path.
 *
 * @minLength 2
 * @maxLength 1024
 */
export type ViewportPath = string;

/**
 * A dash array in the form of "2 3 4"
 *
 * @pattern ^((-?[0-9]+),(-?[0-9]+)\s)+(-?[0-9]+),(-?[0-9]+)$
 */
export type ViewportCoordinatePairs = string;

/**
 * An svg viewbox in the form of "0 0 100 100"
 *
 * @pattern ^([0-9]+\s){3}[0-9]+$
 */
export type ViewBox = string;
