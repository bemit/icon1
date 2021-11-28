import React, { memo } from 'react'
import { areEqual, FixedSizeList } from 'react-window'
import { Box, Button } from '@material-ui/core'
import { useIcon1 } from '@icon1/react/Icon1Provider'
import { Icon1Embed } from '@icon1/react/Icon1Embed'
import Skeleton from '@material-ui/lab/Skeleton'
import { useIcon1Loader } from '@icon1/react/useIcon1Loader/useIcon1Loader'
import { Icon1IconDetails } from '@icon1/core/Icon1Types'

export interface Icon1PickerProps {
    provider: string
    selected: string | undefined
    selectedVariant?: string
    variant?: string
    rowSize?: number
    search?: string
    height?: number
    width?: number
    fulltextSearch?: boolean
    onSelect: (provider: string, icon: Icon1IconDetails, variant?: string) => void
}

export const Icon1PickerBase: React.ComponentType<Icon1PickerProps> = (
    {
        provider,
        rowSize = 6,
        onSelect,
        selected,
        search,
        variant,
        height = 220,
        width = 280,
        fulltextSearch,
    },
) => {
    const {icons} = useIcon1()
    const {listIcons} = useIcon1Loader()

    React.useEffect(() => {
        listIcons(provider).catch(e => console.log(e))
    }, [listIcons, provider])

    const iconSet = icons[provider]

    const filteredIconList = React.useMemo(() => {
        if(!iconSet) {
            return []
        }
        if(typeof search === 'undefined' || search.trim() === '') {
            return iconSet
        }
        const s = search.toLowerCase()
        return iconSet.filter(i => {
            const id = i.id.toLowerCase()
            const title = (i.title || '').toLowerCase()
            return id === s || title === s ||
                (id.indexOf(s) === 0 || title.indexOf(s) === 0) ||
                (fulltextSearch && (id.indexOf(s) !== -1 || title.indexOf(s) !== -1))
        })
    }, [search, iconSet, fulltextSearch])

    const itemSize = width / rowSize
    const itemData = React.useMemo(() => ({
        rowSize: rowSize,
        itemSize: itemSize,
        iconSet: filteredIconList || [],
        onSelect: onSelect,
        selected: selected,
        provider: provider,
        variant: variant,
    }), [
        rowSize,
        itemSize,
        filteredIconList,
        onSelect,
        selected,
        provider,
        variant,
    ])

    return filteredIconList ?
        <FixedSizeList
            itemCount={Number((filteredIconList ? filteredIconList.length / rowSize : 0).toFixed(0)) || 1}
            height={height}
            width={width}
            itemSize={itemSize}
            itemData={itemData}
        >
            {Row}
        </FixedSizeList> : <>
            <Skeleton variant="rect" animation="wave" width={width} height={30} style={{margin: '8px 0 4px 0'}}/>
            <Skeleton variant="rect" animation="wave" width={width} height={30} style={{margin: '8px 0 4px 0'}}/>
            <Skeleton variant="rect" animation="wave" width={width} height={30} style={{margin: '8px 0 4px 0'}}/>
            <Skeleton variant="rect" animation="wave" width={width} height={30} style={{margin: '8px 0 4px 0'}}/>
        </>
}

// @ts-ignore
// eslint-disable-next-line react/display-name
const Row = memo(({data, index, style}) => {
    // Data passed to List as "itemData" is available as props.data
    const {rowSize, variant, onSelect, selected, provider} = data
    const iconSet = data.iconSet as Icon1IconDetails[] | undefined
    const is = iconSet?.slice(index * rowSize, (index * rowSize) + rowSize)

    return <Box style={{...style, display: 'flex'}}>
        {is?.map((i, j) =>
            <RowItem
                key={j}
                provider={provider}
                cellIndex={j}
                onSelect={onSelect}
                variant={variant}
                icon={i}
                selected={selected === i.id}
            />,
        )}
    </Box>
}, areEqual)

const RowItemBase: React.ComponentType<{
    onSelect: Icon1PickerProps['onSelect']
    icon: Icon1IconDetails
    provider: string
    variant: string | undefined
    selected: boolean
    cellIndex: number
}> = (
    {
        provider,
        icon,
        variant,
        onSelect,
        selected,
    },
) => {
    return <Button
        onClick={() => onSelect(provider, icon, variant)}
        variant={selected ? 'outlined' : undefined}
        color={selected ? 'primary' : 'default'}
        style={{
            minWidth: 30,
            borderWidth: 1,
            borderColor: selected ? undefined : 'transparent',
            borderStyle: 'solid',
            padding: 0,
            flexGrow: 1,
        }}
    >
        <Icon1Embed
            fontSize={'large'}
            provider={provider}
            id={icon.id}
            variant={variant}
            title={icon.title}
            color={'inherit'}
        />
    </Button>
}
const RowItem = memo(RowItemBase)

export const Icon1Picker = memo(Icon1PickerBase)
