import React from 'react';
import Typography from 'material-ui/Typography';
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import './TypographyCR.css';
import DivCR from "./DivCR";

const TypographyCR = props => {
    const {
        icon,
        text,
        variant,
        color,
        paragraph,
        subtitleType,
        subtitleColor,
        subtitle,
        align,
        white,
        className,
        textAlign,
        noWrap,
        label,
        shadow,
        lightShadow
    } = props;
    const content = () => {
        let style;
        if (white){style = 'typographyCR-white'}
        else if (shadow){style = 'typographyCR-shadow'}
        else if (shadow && white){style = 'typographyCR-shadow' + 'typographyCR-white'}
        else if (lightShadow){style = 'typographyCR-lightShadow'}
        else {style = className}
        return (
            <div style={{width: '100%'}}>
                <Typography
                    align={textAlign}
                    noWrap={noWrap}
                    className={style}
                    paragraph={paragraph}
                     variant={variant}
                    color={color}>
                    {text}
                </Typography>
                {subtitle &&
                <Typography
                    className={style}
                    noWrap={noWrap}
                    align={textAlign || 'left'}
                    type={subtitleType}
                    color={subtitleColor}>
                    {subtitle}
                </Typography>
                }
            </div>
        )
    };
    return (
        <div className={align ? 'typographyCR-containerAlign' : 'typographyCR-container'}>
            {icon &&
            <div className={'typographyCR-icon'}>
                {icon}
            </div>
            }
            {label ?
                <InputLabel className={'typographyCR-inputLabel'}>
                {label}
                <DivCR type={'paddingTopBottom2'}
                    component={content()}/>
            </InputLabel>
            :
                content()
            }
        </div>
    )
};
export default TypographyCR