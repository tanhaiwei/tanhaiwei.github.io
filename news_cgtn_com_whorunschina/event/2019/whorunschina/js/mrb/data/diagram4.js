/*
 * @Author: Nokey 
 * @Date: 2019-03-29 10:46:22 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-03-29 10:58:18
 */
'use strict'; 

var Diagram4Data = [
    {
        "word": "economy",
        "num": 31,
        "year": 1954,
        "word_index": 0
    },
    {
        "word": "economy",
        "num": 33,
        "year": 1978,
        "word_index": 0
    },
    {
        "word": "economy",
        "num": 50,
        "year": 1993,
        "word_index": 0
    },
    {
        "word": "economy",
        "num": 40,
        "year": 2009,
        "word_index": 0
    },
    {
        "word": "economy",
        "num": 42,
        "year": 2014,
        "word_index": 0
    },
    {
        "word": "economy",
        "num": 41,
        "year": 2018,
        "word_index": 0
    },
    {
        "word": "social development",
        "num": 5,
        "year": 1954,
        "word_index": 1
    },
    {
        "word": "social development",
        "num": 26,
        "year": 1978,
        "word_index": 1
    },
    {
        "word": "social development",
        "num": 15,
        "year": 1993,
        "word_index": 1
    },
    {
        "word": "social development",
        "num": 20,
        "year": 2009,
        "word_index": 1
    },
    {
        "word": "social development",
        "num": 19,
        "year": 2014,
        "word_index": 1
    },
    {
        "word": "social development",
        "num": 13,
        "year": 2018,
        "word_index": 1
    },
    {
        "word": "development models & problems",
        "num": 0,
        "year": 1954,
        "word_index": 2
    },
    {
        "word": "development models & problems",
        "num": 0,
        "year": 1978,
        "word_index": 2
    },
    {
        "word": "development models & problems",
        "num": 4,
        "year": 1993,
        "word_index": 2
    },
    {
        "word": "development models & problems",
        "num": 19,
        "year": 2009,
        "word_index": 2
    },
    {
        "word": "development models & problems",
        "num": 14,
        "year": 2014,
        "word_index": 2
    },
    {
        "word": "development models & problems",
        "num": 38,
        "year": 2018,
        "word_index": 2
    },
    {
        "word": "national defense & foreign affairs",
        "num": 7,
        "year": 1954,
        "word_index": 3
    },
    {
        "word": "national defense & foreign affairs",
        "num": 17,
        "year": 1978,
        "word_index": 3
    },
    {
        "word": "national defense & foreign affairs",
        "num": 20,
        "year": 1993,
        "word_index": 3
    },
    {
        "word": "national defense & foreign affairs",
        "num": 5,
        "year": 2009,
        "word_index": 3
    },
    {
        "word": "national defense & foreign affairs",
        "num": 10,
        "year": 2014,
        "word_index": 3
    },
    {
        "word": "national defense & foreign affairs",
        "num": 8,
        "year": 2018,
        "word_index": 3
    },
    {
        "word": "industry",
        "num": 8,
        "year": 1954,
        "word_index": 4
    },
    {
        "word": "industry",
        "num": 9,
        "year": 1978,
        "word_index": 4
    },
    {
        "word": "industry",
        "num": 2,
        "year": 1993,
        "word_index": 4
    },
    {
        "word": "industry",
        "num": 2,
        "year": 2009,
        "word_index": 4
    },
    {
        "word": "industry",
        "num": 0,
        "year": 2014,
        "word_index": 4
    },
    {
        "word": "industry",
        "num": 0,
        "year": 2018,
        "word_index": 4
    },
    {
        "word": "agriculture",
        "num": 16,
        "year": 1954,
        "word_index": 5
    },
    {
        "word": "agriculture",
        "num": 8,
        "year": 1978,
        "word_index": 5
    },
    {
        "word": "agriculture",
        "num": 8,
        "year": 1993,
        "word_index": 5
    },
    {
        "word": "agriculture",
        "num": 6,
        "year": 2009,
        "word_index": 5
    },
    {
        "word": "agriculture",
        "num": 5,
        "year": 2014,
        "word_index": 5
    },
    {
        "word": "agriculture",
        "num": 4,
        "year": 2018,
        "word_index": 5
    },
    {
        "word": "tertiary industry",
        "num": 0,
        "year": 1954,
        "word_index": 6
    },
    {
        "word": "tertiary industry",
        "num": 0,
        "year": 1978,
        "word_index": 6
    },
    {
        "word": "tertiary industry",
        "num": 12,
        "year": 1993,
        "word_index": 6
    },
    {
        "word": "tertiary industry",
        "num": 14,
        "year": 2009,
        "word_index": 6
    },
    {
        "word": "tertiary industry",
        "num": 0,
        "year": 2014,
        "word_index": 6
    },
    {
        "word": "tertiary industry",
        "num": 0,
        "year": 2018,
        "word_index": 6
    },
    {
        "word": "ecological civilization",
        "num": 0,
        "year": 1954,
        "word_index": 7
    },
    {
        "word": "ecological civilization",
        "num": 0,
        "year": 1978,
        "word_index": 7
    },
    {
        "word": "ecological civilization",
        "num": 2,
        "year": 1993,
        "word_index": 7
    },
    {
        "word": "ecological civilization",
        "num": 3,
        "year": 2009,
        "word_index": 7
    },
    {
        "word": "ecological civilization",
        "num": 5,
        "year": 2014,
        "word_index": 7
    },
    {
        "word": "ecological civilization",
        "num": 7,
        "year": 2018,
        "word_index": 7
    },
    {
        "word": "reform & construction",
        "num": 0,
        "year": 1954,
        "word_index": 8
    },
    {
        "word": "reform & construction",
        "num": 1,
        "year": 1978,
        "word_index": 8
    },
    {
        "word": "reform & construction",
        "num": 7,
        "year": 1993,
        "word_index": 8
    },
    {
        "word": "reform & construction",
        "num": 16,
        "year": 2009,
        "word_index": 8
    },
    {
        "word": "reform & construction",
        "num": 6,
        "year": 2014,
        "word_index": 8
    },
    {
        "word": "reform & construction",
        "num": 14,
        "year": 2018,
        "word_index": 8
    },
    {
        "word": "socialism",
        "num": 0,
        "year": 1954,
        "word_index": 9
    },
    {
        "word": "socialism",
        "num": 4,
        "year": 1978,
        "word_index": 9
    },
    {
        "word": "socialism",
        "num": 1,
        "year": 1993,
        "word_index": 9
    },
    {
        "word": "socialism",
        "num": 1,
        "year": 2009,
        "word_index": 9
    },
    {
        "word": "socialism",
        "num": 0,
        "year": 2014,
        "word_index": 9
    },
    {
        "word": "socialism",
        "num": 1,
        "year": 2018,
        "word_index": 9
    },
    {
        "word": "revolution",
        "num": 1,
        "year": 1954,
        "word_index": 10
    },
    {
        "word": "revolution",
        "num": 13,
        "year": 1978,
        "word_index": 10
    },
    {
        "word": "revolution",
        "num": 0,
        "year": 1993,
        "word_index": 10
    },
    {
        "word": "revolution",
        "num": 0,
        "year": 2009,
        "word_index": 10
    },
    {
        "word": "revolution",
        "num": 0,
        "year": 2014,
        "word_index": 10
    },
    {
        "word": "revolution",
        "num": 0,
        "year": 2018,
        "word_index": 10
    },
    {
        "word": "innovation",
        "num": 0,
        "year": 1954,
        "word_index": 11
    },
    {
        "word": "innovation",
        "num": 0,
        "year": 1978,
        "word_index": 11
    },
    {
        "word": "innovation",
        "num": 0,
        "year": 1993,
        "word_index": 11
    },
    {
        "word": "innovation",
        "num": 0,
        "year": 2009,
        "word_index": 11
    },
    {
        "word": "innovation",
        "num": 3,
        "year": 2014,
        "word_index": 11
    },
    {
        "word": "innovation",
        "num": 10,
        "year": 2018,
        "word_index": 11
    },
    {
        "word": "people's livelihood",
        "num": 0,
        "year": 1954,
        "word_index": 12
    },
    {
        "word": "people's livelihood",
        "num": 1,
        "year": 1978,
        "word_index": 12
    },
    {
        "word": "people's livelihood",
        "num": 2,
        "year": 1993,
        "word_index": 12
    },
    {
        "word": "people's livelihood",
        "num": 14,
        "year": 2009,
        "word_index": 12
    },
    {
        "word": "people's livelihood",
        "num": 8,
        "year": 2014,
        "word_index": 12
    },
    {
        "word": "people's livelihood",
        "num": 10,
        "year": 2018,
        "word_index": 12
    },
    {
        "word": "conditions",
        "num": 0,
        "year": 1954,
        "word_index": 13
    },
    {
        "word": "conditions",
        "num": 0,
        "year": 1978,
        "word_index": 13
    },
    {
        "word": "conditions",
        "num": 0,
        "year": 1993,
        "word_index": 13
    },
    {
        "word": "conditions",
        "num": 0,
        "year": 2009,
        "word_index": 13
    },
    {
        "word": "conditions",
        "num": 1,
        "year": 2014,
        "word_index": 13
    },
    {
        "word": "conditions",
        "num": 0,
        "year": 2018,
        "word_index": 13
    },
    {
        "word": "ethnic minorities",
        "num": 1,
        "year": 1954,
        "word_index": 14
    },
    {
        "word": "ethnic minorities",
        "num": 3,
        "year": 1978,
        "word_index": 14
    },
    {
        "word": "ethnic minorities",
        "num": 2,
        "year": 1993,
        "word_index": 14
    },
    {
        "word": "ethnic minorities",
        "num": 3,
        "year": 2009,
        "word_index": 14
    },
    {
        "word": "ethnic minorities",
        "num": 5,
        "year": 2014,
        "word_index": 14
    },
    {
        "word": "ethnic minorities",
        "num": 0,
        "year": 2018,
        "word_index": 14
    }
]