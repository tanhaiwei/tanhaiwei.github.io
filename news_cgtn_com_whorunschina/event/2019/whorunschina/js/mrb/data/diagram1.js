/*
 * @Author: Nokey 
 * @Date: 2019-03-24 22:19:36 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-03-24 22:20:11
 */
'use strict'; 

var Diagram1Data = [
    {
        "year": 1980,
        "DutyCrime": 0,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 1,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 10,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 1981,
        "DutyCrime": 0,
        "CriminalOffence": 10,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 22,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 5,
        "LegalSystem": 8,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 1982,
        "DutyCrime": 0,
        "CriminalOffence": 5,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 49,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 24
    },
    {
        "year": 1983,
        "DutyCrime": 0,
        "CriminalOffence": 3,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 35,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 9,
        "LegalSystem": 14,
        "EconomicCrimeSPC": 8
    },
    {
        "year": 1984,
        "DutyCrime": 0,
        "CriminalOffence": 10,
        "EconomicCrimeSPP": 4,
        "DutyDereliction": 0,
        "Economy": 25,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 2,
        "LegalSystem": 9,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 1985,
        "DutyCrime": 0,
        "CriminalOffence": 10,
        "EconomicCrimeSPP": 10,
        "DutyDereliction": 0,
        "Economy": 56,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 7,
        "LegalSystem": 7,
        "EconomicCrimeSPC": 9
    },
    {
        "year": 1986,
        "DutyCrime": 0,
        "CriminalOffence": 15,
        "EconomicCrimeSPP": 31,
        "DutyDereliction": 0,
        "Economy": 82,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 8,
        "LegalSystem": 14,
        "EconomicCrimeSPC": 35
    },
    {
        "year": 1987,
        "DutyCrime": 0,
        "CriminalOffence": 11,
        "EconomicCrimeSPP": 22,
        "DutyDereliction": 0,
        "Economy": 37,
        "EconomicDev": 0,
        "RuleLaw": 0,
        "EconomicDispute": 6,
        "LegalSystem": 8,
        "EconomicCrimeSPC": 17
    },
    {
        "year": 1988,
        "DutyCrime": 0,
        "CriminalOffence": 12,
        "EconomicCrimeSPP": 10,
        "DutyDereliction": 0,
        "Economy": 41,
        "EconomicDev": 4,
        "RuleLaw": 0,
        "EconomicDispute": 7,
        "LegalSystem": 12,
        "EconomicCrimeSPC": 13
    },
    {
        "year": 1989,
        "DutyCrime": 0,
        "CriminalOffence": 14,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 36,
        "EconomicDev": 2,
        "RuleLaw": 0,
        "EconomicDispute": 7,
        "LegalSystem": 7,
        "EconomicCrimeSPC": 7
    },
    {
        "year": 1990,
        "DutyCrime": 0,
        "CriminalOffence": 11,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 46,
        "EconomicDev": 4,
        "RuleLaw": 0,
        "EconomicDispute": 10,
        "LegalSystem": 5,
        "EconomicCrimeSPC": 8
    },
    {
        "year": 1991,
        "DutyCrime": 0,
        "CriminalOffence": 7,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 6,
        "Economy": 57,
        "EconomicDev": 3,
        "RuleLaw": 0,
        "EconomicDispute": 11,
        "LegalSystem": 6,
        "EconomicCrimeSPC": 7
    },
    {
        "year": 1992,
        "DutyCrime": 0,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 59,
        "EconomicDev": 6,
        "RuleLaw": 0,
        "EconomicDispute": 8,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 16
    },
    {
        "year": 1993,
        "DutyCrime": 0,
        "CriminalOffence": 6,
        "EconomicCrimeSPP": 4,
        "DutyDereliction": 4,
        "Economy": 56,
        "EconomicDev": 2,
        "RuleLaw": 0,
        "EconomicDispute": 9,
        "LegalSystem": 7,
        "EconomicCrimeSPC": 10
    },
    {
        "year": 1994,
        "DutyCrime": 0,
        "CriminalOffence": 9,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 48,
        "EconomicDev": 4,
        "RuleLaw": 0,
        "EconomicDispute": 10,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 13
    },
    {
        "year": 1995,
        "DutyCrime": 0,
        "CriminalOffence": 8,
        "EconomicCrimeSPP": 9,
        "DutyDereliction": 0,
        "Economy": 49,
        "EconomicDev": 4,
        "RuleLaw": 0,
        "EconomicDispute": 8,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 6
    },
    {
        "year": 1996,
        "DutyCrime": 0,
        "CriminalOffence": 9,
        "EconomicCrimeSPP": 4,
        "DutyDereliction": 0,
        "Economy": 46,
        "EconomicDev": 8,
        "RuleLaw": 0,
        "EconomicDispute": 7,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 4
    },
    {
        "year": 1997,
        "DutyCrime": 6,
        "CriminalOffence": 8,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 41,
        "EconomicDev": 5,
        "RuleLaw": 0,
        "EconomicDispute": 2,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 6
    },
    {
        "year": 1998,
        "DutyCrime": 3,
        "CriminalOffence": 11,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 49,
        "EconomicDev": 4,
        "RuleLaw": 0,
        "EconomicDispute": 7,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 1999,
        "DutyCrime": 8,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 12,
        "Economy": 18,
        "EconomicDev": 1,
        "RuleLaw": 0,
        "EconomicDispute": 1,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2000,
        "DutyCrime": 4,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 5,
        "Economy": 28,
        "EconomicDev": 7,
        "RuleLaw": 0,
        "EconomicDispute": 3,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 4
    },
    {
        "year": 2001,
        "DutyCrime": 12,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 4,
        "Economy": 20,
        "EconomicDev": 4,
        "RuleLaw": 4,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2002,
        "DutyCrime": 7,
        "CriminalOffence": 3,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 4,
        "Economy": 15,
        "EconomicDev": 2,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2003,
        "DutyCrime": 13,
        "CriminalOffence": 6,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 10,
        "EconomicDev": 5,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 4,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2004,
        "DutyCrime": 16,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 10,
        "EconomicDev": 5,
        "RuleLaw": 4,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2005,
        "DutyCrime": 10,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 13,
        "EconomicDev": 7,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2006,
        "DutyCrime": 20,
        "CriminalOffence": 5,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 11,
        "EconomicDev": 3,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2007,
        "DutyCrime": 17,
        "CriminalOffence": 5,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 12,
        "EconomicDev": 5,
        "RuleLaw": 6,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2008,
        "DutyCrime": 16,
        "CriminalOffence": 4,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 7,
        "EconomicDev": 2,
        "RuleLaw": 17,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2009,
        "DutyCrime": 19,
        "CriminalOffence": 6,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 4,
        "Economy": 16,
        "EconomicDev": 8,
        "RuleLaw": 7,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2010,
        "DutyCrime": 19,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 4,
        "Economy": 12,
        "EconomicDev": 9,
        "RuleLaw": 7,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 2
    },
    {
        "year": 2011,
        "DutyCrime": 16,
        "CriminalOffence": 5,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 23,
        "EconomicDev": 13,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2012,
        "DutyCrime": 17,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 4,
        "DutyDereliction": 0,
        "Economy": 9,
        "EconomicDev": 6,
        "RuleLaw": 0,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2013,
        "DutyCrime": 19,
        "CriminalOffence": 3,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 11,
        "EconomicDev": 5,
        "RuleLaw": 9,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 0
    },
    {
        "year": 2014,
        "DutyCrime": 26,
        "CriminalOffence": 5,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 14,
        "EconomicDev": 6,
        "RuleLaw": 7,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 2
    },
    {
        "year": 2015,
        "DutyCrime": 21,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 13,
        "EconomicDev": 5,
        "RuleLaw": 18,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 2
    },
    {
        "year": 2016,
        "DutyCrime": 21,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 8,
        "EconomicDev": 1,
        "RuleLaw": 5,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2017,
        "DutyCrime": 23,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 8,
        "EconomicDev": 1,
        "RuleLaw": 21,
        "EconomicDispute": 2,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2018,
        "DutyCrime": 17,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 8,
        "EconomicDev": 1,
        "RuleLaw": 27,
        "EconomicDispute": 0,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    },
    {
        "year": 2019,
        "DutyCrime": 5,
        "CriminalOffence": 0,
        "EconomicCrimeSPP": 0,
        "DutyDereliction": 0,
        "Economy": 7,
        "EconomicDev": 1,
        "RuleLaw": 22,
        "EconomicDispute": 1,
        "LegalSystem": 0,
        "EconomicCrimeSPC": 1
    }
]