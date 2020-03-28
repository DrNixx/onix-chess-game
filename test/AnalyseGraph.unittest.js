import React from 'react';
import { createStore as reduxCreateStore, combineReducers } from 'redux';
import { expect } from 'chai';  
import { AnalyseGraph } from '../dist/js/analyse/AnalyseGraph';
import { AnalysisResult } from '../dist/js/analyse/AnalysisResult';
import { analyseReducer } from '../dist/js/analyse/AnalyseReducer';
  
describe('<AnalyseGraph/>', function () {
    it('create AnalyseGraph and test some props', function () {
        var props = {
            "state": "ready",
            "white": {
                "blunder": 3,
                "inaccuracy": 8,
                "mistake": 3,
                "acpl": 89
            },
            "black": {
                "blunder": 1,
                "inaccuracy": 3,
                "mistake": 2,
                "acpl": 46
            },
            "analysis": [
                {
                    "ply": 1,
                    "move": "e4",
                    "eval": 22,
                    "best": "d4",
                    "variation": "d4 e6 c4 d5 Nc3 Bb4 Nf3 Nf6 Qa4+ Nc6 Bd2 O-O e3 a5",
                    "depth": 32,
                    "time": 281862,
                    "by": "deep"
                },
                {
                    "ply": 2,
                    "move": "e5",
                    "eval": 8,
                    "best": "e6",
                    "variation": "e6",
                    "depth": 31,
                    "time": 273528,
                    "by": "deep"
                },
                {
                    "ply": 3,
                    "move": "Bc4",
                    "eval": 27,
                    "best": "Nf3",
                    "variation": "Nf3 Nc6 Bb5 Nf6 d3 Ne7 O-O c6 Ba4 Ng6 c4 Be7 Nc3 O-O",
                    "depth": 33,
                    "time": 279699,
                    "by": "deep"
                },
                {
                    "ply": 4,
                    "move": "Nf6",
                    "eval": 16,
                    "depth": 31,
                    "time": 142267,
                    "by": "deep"
                },
                {
                    "ply": 5,
                    "move": "Nc3",
                    "eval": 0,
                    "best": "d3",
                    "variation": "d3 c6 Nf3 d5 Bb3 Bd6 Nc3 d4 Ne2 O-O O-O c5 Ng3 Nc6",
                    "depth": 29,
                    "time": 143200,
                    "by": "deep"
                },
                {
                    "ply": 6,
                    "move": "Nxe4",
                    "eval": -9,
                    "best": "Bc5",
                    "variation": "Bc5 Nf3 d6 d3 c6 O-O O-O a4 Bg4 h3 Bh5 g4 Bg6 Kg2",
                    "depth": 28,
                    "time": 143304,
                    "by": "deep"
                },
                {
                    "ply": 7,
                    "move": "Bxf7+",
                    "eval": 22,
                    "best": "Qh5",
                    "variation": "Qh5 Nd6 Qxe5+ Qe7 Qxe7+ Bxe7 Be2 Nc6 Nf3 b6 Nd5 Bd8 d4 Bb7",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Qh5",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 32,
                    "time": 128348,
                    "by": "deep"
                },
                {
                    "ply": 8,
                    "move": "Kxf7",
                    "eval": -61,
                    "depth": 32,
                    "time": 132343,
                    "by": "deep"
                },
                {
                    "ply": 9,
                    "move": "Nxe4",
                    "eval": -42,
                    "depth": 32,
                    "time": 130152,
                    "by": "deep"
                },
                {
                    "ply": 10,
                    "move": "d5",
                    "eval": -55,
                    "depth": 32,
                    "time": 133997,
                    "by": "deep"
                },
                {
                    "ply": 11,
                    "move": "Ng3",
                    "eval": -42,
                    "depth": 29,
                    "time": 134204,
                    "by": "deep"
                },
                {
                    "ply": 12,
                    "move": "Nc6",
                    "eval": -61,
                    "depth": 28,
                    "time": 134612,
                    "by": "deep"
                },
                {
                    "ply": 13,
                    "move": "N1e2",
                    "eval": -36,
                    "best": "d3",
                    "variation": "d3",
                    "depth": 28,
                    "time": 132530,
                    "by": "deep"
                },
                {
                    "ply": 14,
                    "move": "Bc5",
                    "eval": -74,
                    "best": "h5",
                    "variation": "h5 h4 Be7 d4 exd4 Nxd4 Bg4 Nf3 Re8 Kf1 Kg8 Qd3 Nb4 Qb3",
                    "depth": 30,
                    "time": 127787,
                    "by": "deep"
                },
                {
                    "ply": 15,
                    "move": "O-O",
                    "eval": -28,
                    "best": "c3",
                    "variation": "c3 Rf8 d4 exd4 cxd4 Bb6 O-O Kg8 Be3 Qd6 Nc3 Bd7 Qb3 Be6",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход c3",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 28,
                    "time": 131276,
                    "by": "deep"
                },
                {
                    "ply": 16,
                    "move": "h5",
                    "eval": -128,
                    "depth": 31,
                    "time": 123589,
                    "by": "deep"
                },
                {
                    "ply": 17,
                    "move": "c3",
                    "eval": -110,
                    "best": "d4",
                    "variation": "d4",
                    "judgment": {
                        "name": "Mistake",
                        "comment": "Ошибка. Лучший ход d4",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 28,
                    "time": 122224,
                    "by": "deep"
                },
                {
                    "ply": 18,
                    "move": "h4",
                    "eval": -276,
                    "depth": 34,
                    "time": 121166,
                    "by": "deep"
                },
                {
                    "ply": 19,
                    "move": "d4",
                    "eval": -272,
                    "depth": 34,
                    "time": 123414,
                    "by": "deep"
                },
                {
                    "ply": 20,
                    "move": "exd4",
                    "eval": -272,
                    "depth": 32,
                    "time": 118539,
                    "by": "deep"
                },
                {
                    "ply": 21,
                    "move": "Nxd4",
                    "eval": -258,
                    "best": "cxd4",
                    "variation": "cxd4 Bb6 Nh1 h3 g3 Qf6 f3 Nxd4 Nxd4 Re8 Bf4 Qxd4+ Nf2 Qxd1",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход cxd4",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 31,
                    "time": 120729,
                    "by": "deep"
                },
                {
                    "ply": 22,
                    "move": "hxg3",
                    "eval": -321,
                    "depth": 32,
                    "time": 117237,
                    "by": "deep"
                },
                {
                    "ply": 23,
                    "move": "fxg3+",
                    "eval": -308,
                    "depth": 30,
                    "time": 120209,
                    "by": "deep"
                },
                {
                    "ply": 24,
                    "move": "Kg8",
                    "eval": -321,
                    "depth": 31,
                    "time": 117989,
                    "by": "deep"
                },
                {
                    "ply": 25,
                    "move": "Be3",
                    "eval": -320,
                    "depth": 29,
                    "time": 119930,
                    "by": "deep"
                },
                {
                    "ply": 26,
                    "move": "Nxd4",
                    "eval": -327,
                    "depth": 29,
                    "time": 114705,
                    "by": "deep"
                },
                {
                    "ply": 27,
                    "move": "Bxd4",
                    "eval": -315,
                    "best": "cxd4",
                    "variation": "cxd4 Bb6 Qd3 Qd6 Bf4 Qf6 Be3 Qe7 Rae1 Bd7 Bf4 Qb4 Qf3 c6",
                    "depth": 30,
                    "time": 117974,
                    "by": "deep"
                },
                {
                    "ply": 28,
                    "move": "Qd6",
                    "eval": -329,
                    "depth": 31,
                    "time": 104375,
                    "by": "deep"
                },
                {
                    "ply": 29,
                    "move": "b4",
                    "eval": -315,
                    "best": "Bxc5",
                    "variation": "Bxc5 Qxc5+ Qd4 Qxd4+ cxd4 Bd7 Rae1 Re8 Rxe8+ Bxe8 Re1 Kf7 Re5 Bc6",
                    "depth": 32,
                    "time": 103254,
                    "by": "deep"
                },
                {
                    "ply": 30,
                    "move": "Bb6",
                    "eval": -323,
                    "depth": 30,
                    "time": 107811,
                    "by": "deep"
                },
                {
                    "ply": 31,
                    "move": "Qf3",
                    "eval": -320,
                    "best": "Rf4",
                    "variation": "Rf4",
                    "depth": 28,
                    "time": 112461,
                    "by": "deep"
                },
                {
                    "ply": 32,
                    "move": "Be6",
                    "eval": -342,
                    "depth": 30,
                    "time": 104465,
                    "by": "deep"
                },
                {
                    "ply": 33,
                    "move": "Bxb6",
                    "eval": -323,
                    "best": "Rae1",
                    "variation": "Rae1",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Rae1",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 27,
                    "time": 105311,
                    "by": "deep"
                },
                {
                    "ply": 34,
                    "move": "axb6",
                    "eval": -401,
                    "depth": 31,
                    "time": 108200,
                    "by": "deep"
                },
                {
                    "ply": 35,
                    "move": "h3",
                    "eval": -392,
                    "best": "Qe2",
                    "variation": "Qe2 Rh6 Rf4 Bf7 Qf2 Bg6 a4 Bd3 h4 Re6 Kh2 Qe5 Qd4 Qxd4",
                    "depth": 29,
                    "time": 106816,
                    "by": "deep"
                },
                {
                    "ply": 36,
                    "move": "Rh6",
                    "eval": -440,
                    "depth": 31,
                    "time": 101786,
                    "by": "deep"
                },
                {
                    "ply": 37,
                    "move": "Qf4",
                    "eval": -430,
                    "best": "Qd3",
                    "variation": "Qd3 Ra3 Rf3 Bf7 Qf5 Qe6 Qg5 Rf6 Raf1 Rxf3 Rxf3 Rxa2 Qf4 Qe7",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Qd3",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 29,
                    "time": 106625,
                    "by": "deep"
                },
                {
                    "ply": 38,
                    "move": "Qxf4",
                    "eval": -525,
                    "depth": 31,
                    "time": 98974,
                    "by": "deep"
                },
                {
                    "ply": 39,
                    "move": "gxf4",
                    "eval": -506,
                    "best": "Rxf4",
                    "variation": "Rxf4 Ra3",
                    "depth": 32,
                    "time": 96919,
                    "by": "deep"
                },
                {
                    "ply": 40,
                    "move": "d4",
                    "eval": -507,
                    "best": "Ra3",
                    "variation": "Ra3",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Ra3",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 32,
                    "time": 100483,
                    "by": "deep"
                },
                {
                    "ply": 41,
                    "move": "cxd4",
                    "eval": -447,
                    "best": "f5",
                    "variation": "f5 Bd5 cxd4 Rh4 a4 Rxd4 Rad1 Rxd1 Rxd1 Be4 g4 Rxa4 Rd4 Bc6",
                    "depth": 33,
                    "time": 96075,
                    "by": "deep"
                },
                {
                    "ply": 42,
                    "move": "Rxa2",
                    "eval": -490,
                    "depth": 34,
                    "time": 88815,
                    "by": "deep"
                },
                {
                    "ply": 43,
                    "move": "Rxa2",
                    "eval": -463,
                    "depth": 32,
                    "time": 88545,
                    "by": "deep"
                },
                {
                    "ply": 44,
                    "move": "Bxa2",
                    "eval": -470,
                    "depth": 33,
                    "time": 88496,
                    "by": "deep"
                },
                {
                    "ply": 45,
                    "move": "Kh2",
                    "eval": -463,
                    "best": "Ra1",
                    "variation": "Ra1 Bd5",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Ra1",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 30,
                    "time": 88025,
                    "by": "deep"
                },
                {
                    "ply": 46,
                    "move": "Rd6",
                    "eval": -561,
                    "depth": 33,
                    "time": 86546,
                    "by": "deep"
                },
                {
                    "ply": 47,
                    "move": "Rd1",
                    "eval": -546,
                    "best": "Ra1",
                    "variation": "Ra1 Be6",
                    "depth": 30,
                    "time": 86280,
                    "by": "deep"
                },
                {
                    "ply": 48,
                    "move": "c5",
                    "eval": -557,
                    "best": "Bb3",
                    "variation": "Bb3 Rd3 Bf7 g4 c5 Kg3 cxb4 f5 b3 Rd1 Rc6 d5 Rd6 Rd3",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Bb3",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 33,
                    "time": 86582,
                    "by": "deep"
                },
                {
                    "ply": 49,
                    "move": "bxc5",
                    "eval": -467,
                    "depth": 37,
                    "time": 83496,
                    "by": "deep"
                },
                {
                    "ply": 50,
                    "move": "bxc5",
                    "eval": -475,
                    "depth": 35,
                    "time": 82278,
                    "by": "deep"
                },
                {
                    "ply": 51,
                    "move": "Ra1",
                    "eval": -467,
                    "depth": 35,
                    "time": 82732,
                    "by": "deep"
                },
                {
                    "ply": 52,
                    "move": "Bd5",
                    "eval": -455,
                    "depth": 34,
                    "time": 83165,
                    "by": "deep"
                },
                {
                    "ply": 53,
                    "move": "dxc5",
                    "eval": -442,
                    "depth": 34,
                    "time": 84096,
                    "by": "deep"
                },
                {
                    "ply": 54,
                    "move": "Rc6",
                    "eval": -434,
                    "depth": 32,
                    "time": 84311,
                    "by": "deep"
                },
                {
                    "ply": 55,
                    "move": "Ra5",
                    "eval": -370,
                    "best": "g4",
                    "variation": "g4",
                    "judgment": {
                        "name": "Mistake",
                        "comment": "Ошибка. Лучший ход g4",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 31,
                    "time": 84233,
                    "by": "deep"
                },
                {
                    "ply": 56,
                    "move": "Rg6",
                    "eval": -596,
                    "best": "Ra6",
                    "variation": "Ra6",
                    "judgment": {
                        "name": "Mistake",
                        "comment": "Ошибка. Лучший ход Ra6",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 35,
                    "time": 78421,
                    "by": "deep"
                },
                {
                    "ply": 57,
                    "move": "g4",
                    "eval": -332,
                    "best": "Ra8+",
                    "variation": "Ra8+ Kf7",
                    "depth": 38,
                    "time": 83213,
                    "by": "deep"
                },
                {
                    "ply": 58,
                    "move": "Re6",
                    "eval": -339,
                    "best": "Ra6",
                    "variation": "Ra6 Rb5 Kf7 Rb2 Ra4 Kg3 Ra3+ Kh2 Rf3 Rb4 Rc3 h4 Rxc5 h5",
                    "depth": 38,
                    "time": 84574,
                    "by": "deep"
                },
                {
                    "ply": 59,
                    "move": "h4",
                    "eval": -324,
                    "best": "Ra8+",
                    "variation": "Ra8+ Kf7 Rc8 Re3 Rc7+ Kf6 Rc8 Rc3 h4 Be6 Rf8+ Ke7 Rb8 Bxg4",
                    "depth": 36,
                    "time": 85315,
                    "by": "deep"
                },
                {
                    "ply": 60,
                    "move": "Re3",
                    "eval": -326,
                    "best": "Ra6",
                    "variation": "Ra6 Rb5 Ra2+ Kg3 Ra3+ Kh2 Rc3 Ra5 Kf7 Ra8 Bf3 Rc8 Bxg4 Rc7+",
                    "depth": 37,
                    "time": 83881,
                    "by": "deep"
                },
                {
                    "ply": 61,
                    "move": "h5",
                    "eval": -312,
                    "best": "Ra8+",
                    "variation": "Ra8+ Kf7 Rc8 Bf3 Rc7+ Kf6 Rd7 Bxg4 Rxb7 Rc3 c6 Rxc6 Kg3 Be6",
                    "depth": 36,
                    "time": 82479,
                    "by": "deep"
                },
                {
                    "ply": 62,
                    "move": "Kf7",
                    "eval": -323,
                    "depth": 35,
                    "time": 83759,
                    "by": "deep"
                },
                {
                    "ply": 63,
                    "move": "g5",
                    "eval": -305,
                    "best": "Ra8",
                    "variation": "Ra8 Rf3 Rd8 Bc6 Rd4 Rc3 Rd8 Rxc5 Rh8 b5 Rb8 Rc2+ Kg3 Rc3+",
                    "depth": 34,
                    "time": 84614,
                    "by": "deep"
                },
                {
                    "ply": 64,
                    "move": "Re4",
                    "eval": -351,
                    "best": "Re1",
                    "variation": "Re1",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Re1",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 39,
                    "time": 82216,
                    "by": "deep"
                },
                {
                    "ply": 65,
                    "move": "Kg3",
                    "eval": -295,
                    "depth": 41,
                    "time": 82015,
                    "by": "deep"
                },
                {
                    "ply": 66,
                    "move": "Re3+",
                    "eval": -291,
                    "depth": 41,
                    "time": 83042,
                    "by": "deep"
                },
                {
                    "ply": 67,
                    "move": "Kg4",
                    "eval": -277,
                    "depth": 40,
                    "time": 82798,
                    "by": "deep"
                },
                {
                    "ply": 68,
                    "move": "Bf3+",
                    "eval": -281,
                    "depth": 38,
                    "time": 81948,
                    "by": "deep"
                },
                {
                    "ply": 69,
                    "move": "Kh4",
                    "eval": -260,
                    "depth": 37,
                    "time": 82364,
                    "by": "deep"
                },
                {
                    "ply": 70,
                    "move": "Re4",
                    "eval": -224,
                    "best": "Bc6",
                    "variation": "Bc6 Kg4 Bd7+ f5 Re1 c6 Bxc6 Ra8 Re8 Ra1 Re4+ Kg3 Bd7 Ra7",
                    "judgment": {
                        "name": "Mistake",
                        "comment": "Ошибка. Лучший ход Bc6",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 35,
                    "time": 82644,
                    "by": "deep"
                },
                {
                    "ply": 71,
                    "move": "Ra3",
                    "eval": -80,
                    "best": "g6+",
                    "variation": "g6+ Ke7 c6 Rxf4+ Kg3 Rf6 Re5+ Kd6 cxb7 Bxb7 Re8 Bd5 Rh8 Ke5",
                    "depth": 38,
                    "time": 72117,
                    "by": "deep"
                },
                {
                    "ply": 72,
                    "move": "Be2",
                    "eval": -95,
                    "best": "Bd1",
                    "variation": "Bd1 Ra7 Rxf4+ Kg3 Rg4+ Kf2 Kg8 Ra8+ Kh7 g6+ Kh6 Rh8+ Kg5 Rg8",
                    "depth": 41,
                    "time": 79085,
                    "by": "deep"
                },
                {
                    "ply": 73,
                    "move": "h6",
                    "eval": -80,
                    "best": "Ra7",
                    "variation": "Ra7 Rxf4+ Kg3 Rf3+ Kh2 Rb3 h6 gxh6 c6 Ba6 gxh6 Kg6 Ra8 Rc3",
                    "judgment": {
                        "name": "Blunder",
                        "comment": "Просчет. Лучший ход Ra7",
                        "glyph": {
                            "name": "Просчет",
                            "symbol": "??"
                        }
                    },
                    "depth": 39,
                    "time": 72918,
                    "by": "deep"
                },
                {
                    "ply": 74,
                    "move": "Rxf4+",
                    "eval": -634,
                    "depth": 40,
                    "time": 73541,
                    "by": "deep"
                },
                {
                    "ply": 75,
                    "move": "Kg3",
                    "eval": -619,
                    "best": "Kh3",
                    "variation": "Kh3 gxh6",
                    "depth": 44,
                    "time": 75554,
                    "by": "deep"
                },
                {
                    "ply": 76,
                    "move": "Rg4+",
                    "eval": -605,
                    "depth": 36,
                    "time": 71927,
                    "by": "deep"
                },
                {
                    "ply": 77,
                    "move": "Kf2",
                    "eval": -553,
                    "best": "Kh2",
                    "variation": "Kh2 gxh6",
                    "judgment": {
                        "name": "Blunder",
                        "comment": "Просчет. Лучший ход Kh2",
                        "glyph": {
                            "name": "Просчет",
                            "symbol": "??"
                        }
                    },
                    "depth": 34,
                    "time": 73375,
                    "by": "deep"
                },
                {
                    "ply": 78,
                    "move": "Bb5",
                    "eval": -912,
                    "depth": 43,
                    "time": 66371,
                    "by": "deep"
                },
                {
                    "ply": 79,
                    "move": "Rh3",
                    "eval": -842,
                    "best": "h7",
                    "variation": "h7 Rh4",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход h7",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 35,
                    "time": 68169,
                    "by": "deep"
                },
                {
                    "ply": 80,
                    "move": "gxh6",
                    "eval": -907,
                    "depth": 48,
                    "time": 63309,
                    "by": "deep"
                },
                {
                    "ply": 81,
                    "move": "gxh6",
                    "eval": -892,
                    "depth": 49,
                    "time": 65883,
                    "by": "deep"
                },
                {
                    "ply": 82,
                    "move": "Kg8",
                    "eval": -825,
                    "depth": 43,
                    "time": 64878,
                    "by": "deep"
                },
                {
                    "ply": 83,
                    "move": "Kf3",
                    "eval": -490,
                    "best": "h7+",
                    "variation": "h7+ Kh8",
                    "judgment": {
                        "name": "Blunder",
                        "comment": "Просчет. Лучший ход h7+",
                        "glyph": {
                            "name": "Просчет",
                            "symbol": "??"
                        }
                    },
                    "depth": 41,
                    "time": 67737,
                    "by": "deep"
                },
                {
                    "ply": 84,
                    "move": "Rg5",
                    "eval": -937,
                    "depth": 48,
                    "time": 67537,
                    "by": "deep"
                },
                {
                    "ply": 85,
                    "move": "Kf4",
                    "eval": -937,
                    "best": "Ke3",
                    "variation": "Ke3 Rxc5 Rg3+ Kh8 Rg7 Bc6 Kd4 Rc1 Rc7 b5 h7 Rc2 Re7 Rc4+",
                    "depth": 41,
                    "time": 67136,
                    "by": "deep"
                },
                {
                    "ply": 86,
                    "move": "Rxc5",
                    "eval": -937,
                    "depth": 42,
                    "time": 66217,
                    "by": "deep"
                },
                {
                    "ply": 87,
                    "move": "Rg3+",
                    "eval": -922,
                    "best": "Re3",
                    "variation": "Re3 Bc6 Re7 Rh5 Rg7+ Kh8 Rf7 Rxh6 Ke5 Kg8 Rf1 Kg7 Rf4 Rg6",
                    "depth": 44,
                    "time": 66613,
                    "by": "deep"
                },
                {
                    "ply": 88,
                    "move": "Kh8",
                    "eval": -915,
                    "depth": 46,
                    "time": 66022,
                    "by": "deep"
                },
                {
                    "ply": 89,
                    "move": "Rg7",
                    "eval": -824,
                    "best": "Ke4",
                    "variation": "Ke4 Kh7",
                    "judgment": {
                        "name": "Inaccuracy",
                        "comment": "Ошибка. Лучший ход Ke4",
                        "glyph": {
                            "name": "Ошибка",
                            "symbol": "?"
                        }
                    },
                    "depth": 37,
                    "time": 67411,
                    "by": "deep"
                },
                {
                    "ply": 90,
                    "move": "Bc6",
                    "eval": -893,
                    "depth": 37,
                    "time": 64957,
                    "by": "deep"
                },
                {
                    "ply": 91,
                    "move": "Rc7",
                    "eval": -678,
                    "best": "Ke3",
                    "variation": "Ke3 b5",
                    "depth": 38,
                    "time": 63756,
                    "by": "deep"
                },
                {
                    "ply": 92,
                    "move": "Rh5",
                    "eval": -578,
                    "depth": 42,
                    "time": 67006,
                    "by": "deep"
                },
                {
                    "ply": 93,
                    "move": "h7",
                    "eval": -485,
                    "best": "Rg7",
                    "variation": "Rg7 Rxh6",
                    "judgment": {
                        "name": "Mistake",
                        "comment": "Mistake"
                    },
                    "depth": 37,
                    "time": 70028,
                    "by": "deep"
                },
                {
                    "ply": 94,
                    "move": "Rxh7",
                    "mate": -37,
                    "judgment": {
                        "name": "Blunder",
                        "comment": "Mate found",
                        "glyph": {
                            "name": "Blunder",
                            "symbol": "??"
                        }
                    },
                    "depth": 62,
                    "time": 59076,
                    "by": "deep"
                },
                {
                    "ply": 95,
                    "move": "Rc8+",
                    "mate": -36,
                    "depth": 57,
                    "time": 57634,
                    "by": "deep"
                },
                {
                    "ply": 96,
                    "move": "Kg7",
                    "mate": -35,
                    "depth": 56,
                    "time": 59288,
                    "by": "deep"
                },
                {
                    "ply": 97,
                    "move": "Kg5",
                    "mate": -36,
                    "best": "Ke5",
                    "variation": "Ke5 Rh8 Rc7+ Kg6 Kd4 Kf6 Kc4 Rh5 Rc8 Ke7 Kb4 Kd6 Rd8+ Kc7",
                    "depth": 49,
                    "time": 60353,
                    "by": "deep"
                },
                {
                    "ply": 98,
                    "move": "Rh1",
                    "mate": -32,
                    "depth": 61,
                    "time": 57279,
                    "by": "deep"
                },
                {
                    "ply": 99,
                    "move": "Rc7+",
                    "mate": -32,
                    "best": "Rd8",
                    "variation": "Rd8 Kf7 Kf4 Ke7 Rd2 b5 Ke3 Rh5 Rd1 Rd5 Rf1 Kd6 Ra1 Rh5",
                    "depth": 44,
                    "time": 59590,
                    "by": "deep"
                },
                {
                    "ply": 100,
                    "move": "Kf8",
                    "mate": -31,
                    "depth": 57,
                    "time": 57023,
                    "by": "deep"
                },
                {
                    "ply": 101,
                    "move": "Kf6",
                    "mate": -30,
                    "depth": 50,
                    "time": 55940,
                    "by": "deep"
                },
                {
                    "ply": 102,
                    "move": "Ke8",
                    "mate": -30,
                    "depth": 51,
                    "time": 55209,
                    "by": "deep"
                },
                {
                    "ply": 103,
                    "move": "Ke6",
                    "mate": -31,
                    "best": "Ke5",
                    "variation": "Ke5 Kd8 Rg7 Rd1 Rg8+ Kc7 Rg7+ Rd7 Rg1 b5 Rc1 Kb6 Rb1 Rd3",
                    "depth": 51,
                    "time": 58893,
                    "by": "deep"
                },
                {
                    "ply": 104,
                    "move": "Kd8",
                    "mate": -29,
                    "depth": 57,
                    "time": 53526,
                    "by": "deep"
                },
                {
                    "ply": 105,
                    "move": "Rg7",
                    "mate": -28,
                    "best": "Rf7",
                    "variation": "Rf7 Rd1 Rf8+ Kc7 Rf7+ Bd7+ Ke5 b5 Rf2 Kb6 Ke4 b4 Rb2 Kb5",
                    "depth": 52,
                    "time": 54923,
                    "by": "deep"
                },
                {
                    "ply": 106,
                    "move": "Rd1",
                    "mate": -27,
                    "depth": 54,
                    "time": 53630,
                    "by": "deep"
                },
                {
                    "ply": 107,
                    "move": "Ke5",
                    "mate": -26,
                    "best": "Rg8+",
                    "variation": "Rg8+ Kc7 Rg7+ Bd7+ Ke5 b5 Rh7 Kb6 Rh4 Bc6 Rf4 Kc5 Rf2 Re1+",
                    "depth": 53,
                    "time": 54805,
                    "by": "deep"
                },
                {
                    "ply": 108,
                    "move": "b5",
                    "mate": -25,
                    "depth": 57,
                    "time": 53835,
                    "by": "deep"
                },
                {
                    "ply": 109,
                    "move": "Rh7",
                    "mate": -24,
                    "best": "Rg3",
                    "variation": "Rg3 Kc7 Rg4 Kb6 Rf4 Kc5 Rf2 b4 Rc2+ Kb5 Rf2 b3 Rb2 Bd5",
                    "depth": 52,
                    "time": 52288,
                    "by": "deep"
                },
                {
                    "ply": 110,
                    "move": "b4",
                    "mate": -23,
                    "depth": 55,
                    "time": 50466,
                    "by": "deep"
                },
                {
                    "ply": 111,
                    "move": "Rh2",
                    "mate": -22,
                    "best": "Rh4",
                    "variation": "Rh4 Rd5+ Ke6 b3 Rh2 Rd1 Rf2 Kc7 Rb2 Bd5+ Ke5 Kc6 Rh2 Kc5",
                    "depth": 51,
                    "time": 50084,
                    "by": "deep"
                },
                {
                    "ply": 112,
                    "move": "b3",
                    "mate": -22,
                    "depth": 54,
                    "time": 49993,
                    "by": "deep"
                },
                {
                    "ply": 113,
                    "move": "Kf4",
                    "mate": -21,
                    "best": "Rb2",
                    "variation": "Rb2 Rd3 Rb1 Kc7 Rb2 Bd5 Re2 Rd1 Rh2 Kc6 Rb2 Kc5 Rf2 Rg1",
                    "depth": 55,
                    "time": 51945,
                    "by": "deep"
                },
                {
                    "ply": 114,
                    "move": "Kc7",
                    "mate": -19,
                    "depth": 57,
                    "time": 51393,
                    "by": "deep"
                },
                {
                    "ply": 115,
                    "move": "Ke3",
                    "mate": -18,
                    "best": "Ke5",
                    "variation": "Ke5 Bd5 Rb2 Kc6 Rh2 Kc5 Rb2 Rg1 Rd2 Rg5+ Kf6 Rg2 Rd1 b2",
                    "depth": 52,
                    "time": 51294,
                    "by": "deep"
                },
                {
                    "ply": 116,
                    "move": "Kd6",
                    "mate": -18,
                    "depth": 53,
                    "time": 48972,
                    "by": "deep"
                },
                {
                    "ply": 117,
                    "move": "Rb2",
                    "mate": -17,
                    "best": "Re2",
                    "variation": "Re2 Bd5 Rb2 Kc5 Kf4 Rg1 Ke5 Rg2 Rb1 b2 Kf5 Re2 Kg4 Be4",
                    "depth": 55,
                    "time": 50054,
                    "by": "deep"
                },
                {
                    "ply": 118,
                    "move": "Bd5",
                    "mate": -17,
                    "depth": 55,
                    "time": 50767,
                    "by": "deep"
                },
                {
                    "ply": 119,
                    "move": "Ke2",
                    "mate": -16,
                    "best": "Rh2",
                    "variation": "Rh2 Kc5 Kf4 Rg1 Re2 Rg2 Re8 b2 Rb8 Re2 Kg5 Bc4 Kh4 Bb5",
                    "depth": 47,
                    "time": 52561,
                    "by": "deep"
                },
                {
                    "ply": 120,
                    "move": "Rg1",
                    "mate": -15,
                    "depth": 61,
                    "time": 46628,
                    "by": "deep"
                },
                {
                    "ply": 121,
                    "move": "Kd3",
                    "mate": -14,
                    "depth": 59,
                    "time": 48355,
                    "by": "deep"
                },
                {
                    "ply": 122,
                    "move": "Kc5",
                    "mate": -14,
                    "depth": 56,
                    "time": 43592,
                    "by": "deep"
                },
                {
                    "ply": 123,
                    "move": "Rf2",
                    "mate": -14,
                    "best": "Ke3",
                    "variation": "Ke3 Rg2 Rb1 b2 Rf1 Rc2 Rb1 Ba2 Rxb2 Rxb2 Ke4 Bd5+ Ke5 Ra2",
                    "depth": 53,
                    "time": 48312,
                    "by": "deep"
                },
                {
                    "ply": 124,
                    "move": "Rg3+",
                    "mate": -12,
                    "depth": 69,
                    "time": 42020,
                    "by": "deep"
                },
                {
                    "ply": 125,
                    "move": "Kd2",
                    "mate": -11,
                    "depth": 69,
                    "time": 46011,
                    "by": "deep"
                },
                {
                    "ply": 126,
                    "move": "Kd4",
                    "mate": -11,
                    "depth": 61,
                    "time": 40231,
                    "by": "deep"
                },
                {
                    "ply": 127,
                    "move": "Rf4+",
                    "mate": -10,
                    "best": "Kc1",
                    "variation": "Kc1 Rg2 Rxg2 Bxg2 Kd1 Bc6 Kc1 Kc3 Kd1 b2 Ke1 b1=Q+ Kf2 Qf5+",
                    "depth": 64,
                    "time": 42677,
                    "by": "deep"
                },
                {
                    "ply": 128,
                    "move": "Be4",
                    "mate": -8,
                    "depth": 84,
                    "time": 50856,
                    "by": "deep"
                },
                {
                    "ply": 129,
                    "move": "Rf1",
                    "mate": -7,
                    "best": "Ke2",
                    "variation": "Ke2 b2 Rf7 Rg2+ Rf2 b1=Q Rxg2 Qb2+ Ke1 Bxg2 Kd1 Bf3+ Ke1 Qe2#",
                    "depth": 84,
                    "time": 49827,
                    "by": "deep"
                },
                {
                    "ply": 130,
                    "move": "Rg2+",
                    "mate": -5,
                    "depth": 127,
                    "time": 10321,
                    "by": "deep"
                },
                {
                    "ply": 131,
                    "move": "Kc1",
                    "mate": -4,
                    "best": "Rf2",
                    "variation": "Rf2 Rxf2+ Kd1 Rh2 Ke1 b2 Kf1 b1=Q#",
                    "depth": 127,
                    "time": 14315,
                    "by": "deep"
                },
                {
                    "ply": 132,
                    "move": "b2+",
                    "mate": -2,
                    "depth": 127,
                    "time": 6,
                    "by": "deep"
                }
            ]
        };

        const result = new AnalysisResult(props);
        const preloadedState = {
            analysis: {
                status: result.state,
                completed: 100,
                white: result.white,
                black: result.black,
                evals: result.analysis,
                result: result
            }
        }

        const store = reduxCreateStore(
            combineReducers({
                analysis: analyseReducer
            }), preloadedState);
        
        const wrapper = mount(<AnalyseGraph id={1} store={store} ply={6} />);
        expect(wrapper.props().ply).to.be.equal(6);
    });
});