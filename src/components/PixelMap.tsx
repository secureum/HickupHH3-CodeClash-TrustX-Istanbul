'use client'

import { useState, useEffect } from 'react';
import {
  useIPixelsMapGetRangePixelData,
  useIPixelsMapGetTeamNames,
  useIPixelsMapGetTeamNumbers,
  useXIstGameEndTime,
  useXIstGetRemainingMints
} from '../generated'
import { Sheet, Box, Grid, Tooltip, Skeleton, Table, Divider, Typography } from '@mui/joy';
import { useBlockNumber } from 'wagmi';

interface Pixel {
    index: number,
    miner: string,
    minerTeamNumber: bigint,
    minerTeamName: string,
    colorTeamNumber: bigint,
    colorTeamName: string,
    numMinerInstancesOverwritten: number,
    numColorInstancesOverwritten: number,
    color: number
}

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

let _pixelMap: Pixel[] = [];

export function PixelMap() {
  // fetch and filter pixel data
  const { pixelMap, epochNum, epochMintsRemaining, totalMintsRemaining, endTime, isLoading } = fetchAndFilterData()
  if (_pixelMap.length == 0) {
    _pixelMap = pixelMap;
  } else {
    pixelMap.forEach((pixel, index) => {
        _pixelMap[index] = pixel;
    })
  }
  return (
    <Sheet className="pt-2">
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
            <Countdowns
                epoch={epochNum}
                epochMintsRemaining={epochMintsRemaining}
                totalMintsRemaining={totalMintsRemaining}
                endTime={endTime}
            />
            <DrawPixelMap pixelMap={_pixelMap as Pixel[]} isLoading={isLoading}/>
            <ScoringTables pixelMap={_pixelMap as Pixel[]} isLoading={isLoading}/>
        </Grid>
    </Sheet>
    
  )
}

function fetchAndFilterData(): {
    pixelMap: Pixel[],
    epochMintsRemaining: bigint,
    totalMintsRemaining: bigint,
    epochNum: bigint,
    endTime: bigint,
    isLoading: boolean} {
    ///////////////////////
    //// COUNTDOWN DATA ///
    ///////////////////////
    const { data: endTime, isLoading: gameTimeLoading } = useXIstGameEndTime();
    const { data: blockNumber, isLoading: blockNumLoading } = useBlockNumber();
    const {data: remainingMintEpochInfo, isLoading: mintInfoLoading } = useXIstGetRemainingMints({watch: true, args: [blockNumLoading ? BigInt(0) : blockNumber!]});
    
    ///////////////////////
    //// PIXEL MAP DATA ///
    ///////////////////////
    // fetch pixel map
    let { data: pixelMap, isLoading: mapLoading } = useIPixelsMapGetRangePixelData({ args: [0, 64], watch: true })
    
    // iterate pixelMap and store array of non-duplicates (excluding null)
    const uniqueMiners = [...new Set(pixelMap?.map(pixel => pixel.miner).filter(miner => miner !== NULL_ADDRESS))];

    // then fetch team numbers of miners
    let { data: minerTeamNumbers, isLoading: teamNumbersLoading } = useIPixelsMapGetTeamNumbers({args: [uniqueMiners]})
    
    // combine with miner team numbers for fetching of team names
    const uniqueColorTeamNumbers = [... new Set(pixelMap?.map(pixel => pixel.colorTeamNumber))]
    const uniqueTeamNumbers = minerTeamNumbers === undefined ? 
        uniqueColorTeamNumbers :
        [... new Set([...minerTeamNumbers, ...uniqueColorTeamNumbers])];

    // call useIPixelsMapGetTeamNames to get all color team names
    let { data: teamNames, isLoading: teamNamesLoading } = useIPixelsMapGetTeamNames({args: [uniqueTeamNumbers]});
    if (mapLoading || teamNumbersLoading || teamNamesLoading || blockNumLoading || mintInfoLoading || gameTimeLoading) return {
        pixelMap: [],
        epochNum: BigInt(0),
        epochMintsRemaining: BigInt(0),
        totalMintsRemaining: BigInt(0),
        endTime: endTime || BigInt(-1),
        isLoading: true
    }

    // finally, map pixels and store as expanded Pixel[]
    return { pixelMap: pixelMap!.map((pixel, index) => {
        const colorTeamName = teamNames![uniqueTeamNumbers.indexOf(pixel.colorTeamNumber)]

        const minerTeamNumber = uniqueMiners.indexOf(pixel.miner) == -1 ?
            BigInt(-1) :
            BigInt(minerTeamNumbers![uniqueMiners.indexOf(pixel.miner)])

        const minerTeamName = (minerTeamNumber == BigInt(-1) || uniqueTeamNumbers.indexOf(minerTeamNumber) == -1) ?
            '-' :
            teamNames![uniqueTeamNumbers.indexOf(minerTeamNumber)]

        return {
            ...pixel,
            index,
            colorTeamName,
            minerTeamNumber,
            minerTeamName
        }
        }),
        epochNum: remainingMintEpochInfo![0],
        epochMintsRemaining: remainingMintEpochInfo![1],
        totalMintsRemaining: remainingMintEpochInfo![2],
        endTime: endTime!,
        isLoading: false
    }
}

function Countdowns(
    {epoch, epochMintsRemaining, totalMintsRemaining, endTime}:
    {epoch: bigint, epochMintsRemaining: bigint, totalMintsRemaining: bigint, endTime: bigint}
) {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endTime));

    // Calculate time remaining and update it every second
    function calculateTimeRemaining(endTime: bigint) {
        const now = BigInt(Math.floor(Date.now() / 1000));
        const difference = Number(endTime - now);
        return Math.max(0, difference); // Ensure it's not negative
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining(endTime);
            if (remaining === 0) {
                clearInterval(timer); // Stop the timer when time is up
            }
            setTimeRemaining(remaining);
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    const seconds = timeRemaining % 60;
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const hours = Math.floor(timeRemaining / 3600);

    return(
        <Grid xs={12} sm={2}>
            <Typography level="body-lg">Total Mints Left:</Typography>
            <Typography level="h3" variant='outlined' color='warning'>{totalMintsRemaining.toString()}</Typography>
            <Divider />
            <br />
            <Typography level="body-lg">Epoch:</Typography>
            <Typography level="h3" variant='outlined' color='success'>{epoch.toString()}</Typography>
            <Divider />
            <br />
            <Typography level="body-lg">Epoch Mints Left:</Typography>
            <Typography level="h3" variant='outlined' color='warning'>{epochMintsRemaining.toString()}</Typography>
            <Divider />
            <br />
            <Typography level="body-lg">Game ends in:</Typography>
            <Typography level="h3" variant='outlined' color='danger'>
            {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </Typography>
        </Grid>
    )
}

function DrawPixelMap({pixelMap, isLoading}: { pixelMap: Pixel[], isLoading: boolean}) {
    return(
        <Grid xs={12} sm={6} md={5} lg={6} className='grid grid-cols-8 pixel-map'>
        {
            isLoading ? 
            <Skeleton loading={isLoading} variant="overlay"></Skeleton> :
            pixelMap.map((pixel) => {
                return (
                <Tooltip
                    arrow
                    variant="outlined"
                    title={genTooltip(pixel as Pixel)}
                    placement={pixel.index > 31 ? "top" : "bottom"}
                    key={'tooltip' + pixel.index}
                >
                    <Box 
                        className='aspect-square border border-black'
                        key={'pixel' + pixel.index}
                        sx={{bgcolor:getColor(pixel.color)}}
                    />
                </Tooltip>
                )
            })
        }
        </Grid>
    )
}

function ScoringTables({pixelMap, isLoading}: { pixelMap: Pixel[], isLoading: boolean}) {
    if (isLoading) return (<></>)
    const { scorers: topPainters } = extractScorers(pixelMap as Pixel[], 0);
    const { scorers: topMinerTeams } = extractScorers(pixelMap as Pixel[], 1);
    const { scorers: topMinerAddrs } = extractScorers(pixelMap as Pixel[], 2);

    return(
        <Grid xs={12} sm={4} md={5} lg={4}>
            <Sheet className='tables-container'>
                <Table
                    size="sm"
                    stripe="odd"
                    hoverRow
                    stickyHeader
                    sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
                >
                <caption>Top Painters</caption>
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Team</th>
                        <th>Count</th>
                        <th style={{ width: '40%' }}>Pixels</th>
                    </tr> 
                </thead>
                <tbody>
                    {topPainters.map((team) => (
                        <tr key={`painter` + team.number}>
                            <td>{team.name + ` (Team ${team.number.toString()})`}</td>
                            <td>{team.count}</td>
                            <td>{team.indices.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Sheet>
            <Divider />
            <Sheet className='tables-container'>
                <Table
                    size="sm"
                    stripe="odd"
                    hoverRow
                    stickyHeader
                    sx={{ 
                        captionSide: 'top',
                        '& tbody': { bgcolor: 'background.surface' }
                    }}
                >
                <caption>Top Miner Teams</caption>
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Team</th>
                        <th>Count</th>
                        <th style={{ width: '40%' }}>Pixels</th>
                    </tr> 
                </thead>
                <tbody>
                    {topMinerTeams.map((team) => (
                        <tr key={`minerTeam` + team.number}>
                            <td>{team.name + ` (Team ${team.number.toString()})`}</td>
                            <td>{team.count}</td>
                            <td>{team.indices.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Sheet>
            <Divider />
            <Sheet className='tables-container'>
                <Table
                    size="sm"
                    stripe="odd"
                    hoverRow
                    stickyHeader
                    sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
                >
                <caption>Top Miners</caption>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Team</th>
                        <th>Count</th>
                        <th>Pixels</th>
                    </tr> 
                </thead>
                <tbody>
                    {topMinerAddrs.map((team) => (
                        <tr key={`miner` + team.miner}>
                            <td>{team.miner}</td>
                            <td>{team.name + ` (Team ${team.number.toString()})`}</td>
                            <td>{team.count}</td>
                            <td>{team.indices.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Sheet>
        </Grid>
    )
}

function extractScorers(pixels: Pixel[], countType: number) {
    const teamCounts = countOccurrences(pixels, countType);
    const sortedTeamCounts = teamCounts.sort((a, b) => b.count - a.count);
    // filter out team number -1 & null address
    // for painting, we also filter out team number 0 (initial state)
    const filteredScorers = sortedTeamCounts.filter((team) => team.miner !== NULL_ADDRESS && team.number != BigInt(-1));
    const scorers = countType === 0 ?
        filteredScorers.filter((team) => team.number != BigInt(0)) :
        filteredScorers;
    return {scorers}
}

function countOccurrences(arr: Pixel[], countType: number): { miner: string, number: bigint; name: string; count: number; indices: number[] }[] {
    const counts = new Map<bigint | string, number>();
    const indicesMap = new Map<bigint | string, number[]>();
    const namesMap = new Map<bigint | string, string>();
    const minerAddressesMap = new Map<bigint | string, string>();
    const minerTeamNumbersMap = new Map<bigint | string, bigint>();

    let number: bigint;
    let name: string;
    let miner: string;
    let mapKey: bigint | string;
    for (let i = 0; i < arr.length; i++) {
        // countType: 0 = color, 1 = miner team, 2 = miner address
        if (countType == 0) {
            miner = '';
            number = arr[i].colorTeamNumber;
            name = arr[i].colorTeamName;
            mapKey = number;
        } else if (countType == 1) {
            miner = '';
            number = arr[i].minerTeamNumber;
            name = arr[i].minerTeamName;
            mapKey = number;
        } else {
            miner = arr[i].miner;
            number = arr[i].minerTeamNumber;
            name = arr[i].minerTeamName;
            mapKey = miner;
        }
        
        // increment count in counts
        const count = counts.get(mapKey) || 0;
        counts.set(mapKey, count + 1);

        // add index to indicesMap
        if (indicesMap.has(mapKey)) {
            indicesMap.get(mapKey)?.push(i);
        } else {
            indicesMap.set(mapKey, [i]);
        }

        // add miner to minersMap
        if (!minerAddressesMap.has(mapKey)) minerAddressesMap.set(mapKey, miner);

        // add teamName to namesMap
        if (!namesMap.has(mapKey)) namesMap.set(mapKey, name);

        // add team number to minerTeamNumbersMap
        if (!minerTeamNumbersMap.has(mapKey)) minerTeamNumbersMap.set(mapKey, number);
    }

    const result: { miner: string, number: bigint; name: string; count: number; indices: number[] }[] = [];

    counts.forEach((count, mapKey) => {
        const indices = indicesMap.get(mapKey) || [];
        const name = namesMap.get(mapKey) || '';
        const miner = minerAddressesMap.get(mapKey) || '';
        const retrievedNum = minerTeamNumbersMap.get(mapKey);
        const number = typeof retrievedNum !== 'undefined' ? retrievedNum : BigInt(-1);
        result.push({ miner, number, name, count, indices });
    });

    return result;
}

function genTooltip(pixel: Pixel) {
    return (
        <Box>
            Pixel Number: {pixel.index}
            <br />
            {pixel.minerTeamNumber !== BigInt(-1) && (
                <>
                    Miner: {pixel.miner}
                    <br />
                    Miner Team: {pixel.minerTeamName} (Team {pixel.minerTeamNumber.toString()})
                    <br />
                </> 
            )}
            Color Team: {pixel.colorTeamName + ` (Team ${pixel.colorTeamNumber.toString()})`}
            <br />
            numMinerInstancesOverwritten: {pixel.numMinerInstancesOverwritten}
            <br />
            numColorInstancesOverwritten: {pixel.numColorInstancesOverwritten}
        </Box>
    )
}

interface ColorMap {
    [key: number]: string
}

function getColor(color: number) {
    if (color > 15) return '#FFFFFF';
    const hexColors: ColorMap = {
        0: '#FFFFFF',
        1: '#F7E7CE',
        2: '#E81416',
        3: '#7B3F00',
        4: '#FFA500',
        5: '#F6C324',
        6: '#FAEB36',
        7: '#79C314',
        8: '#228B22',
        9: '#0476D0',
        10: '#191970',
        11: '#4B369D',
        12: '#70369D',
        13: '#FF69B4',
        14: '#36454F',
        15: '#000000'
    }
    return hexColors[color];
}
