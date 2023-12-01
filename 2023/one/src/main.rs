use std::fs;
use std::dbg;
use regex::Regex;

fn main() {
    println!("Hello, world!");

    let puzzle = fs::read_to_string("puzzle-input")
        .expect("Should have been able to read the file");
    let puzzleClone = puzzle.clone();
    let mut lineSums = Vec::new();
    let lines = puzzle.lines();

    for line in lines {
        let possibleFirst = line.chars().find(|c| c.is_ascii_digit())
            .expect("line should have a digit");
        let possibleLast = line.chars().rfind(|c| c.is_ascii_digit())
            .expect("line should have an ending digit");
        let mut combinedNum = possibleFirst.to_string();
        combinedNum.push_str(&possibleLast.to_string());
        let num: i8 = combinedNum.parse().unwrap();
        lineSums.push(num);
    }

    let mut totalSum: i32 = 0;
    for line in lineSums {
        totalSum += line as i32;
    }
    println!("Part One Total: {totalSum}");

    // Part Two
    let demo_puzzle = fs::read_to_string("demo-input")
        .expect("Should have been able to read the file");
    let mut secondSum = Vec::new();
    let regex = Regex::new(r"\d|one|two|three|four|five|six|seven|eight|nine").unwrap();
    // TODO: don't get right answer for part two..
    let lines = demo_puzzle.lines();
    //let rawNums = ();
    for line in lines {
        println!("{line}");
        let mut iter = regex.find_iter(line);
        let first = iter.next().unwrap();
        let mut last = iter.last();

        // It's a possibility that a line just has one match,
        // and iter would be consumed after calling next()
        // if so, then the last match is the same as the first
        if last.is_none() {
            last = Some(first.clone());
        }
        println!("first: {}, last: {}", first.as_str(), last.unwrap().as_str());

        // Blah... this block is weird due to getting back String from convert
        // function and working with string slices for the other...
        let realFirst;
        if !first.as_str().chars().next().unwrap().is_ascii_digit() {
            realFirst = convertSpelledNumToInt(first.as_str());
            println!("real {realFirst}");
        } else {
            realFirst = first.as_str().to_string();
        }

        let realLast;
        if !last.unwrap().as_str().chars().next().unwrap().is_ascii_digit() {
            realLast = convertSpelledNumToInt(last.unwrap().as_str());
            println!("real last {realLast}");
        } else {
            realLast = last.unwrap().as_str().to_string();
        }

        let combinedNum = format!("{}{}", realFirst, realLast);
        let num: i32 = combinedNum.parse().unwrap();
        println!("finally {combinedNum} - convert: {num}");
        secondSum.push(num);
            // let possibleLast = line.chars().rfind(|c| c.is_ascii_digit())
        //     .expect("line should have an ending digit");
        // let mut combinedNum = possibleFirst.to_string();
        // combinedNum.push_str(&possibleLast.to_string());
        // let num: i8 = combinedNum.parse().unwrap();
        // lineSums.push(num);
    }

    let secondClone = secondSum.clone();
    let totalSecond: i32 = secondSum.iter().sum();
    println!("Part Two Total: {totalSecond}");
    let mut total2Sum: i32 = 0;
    for line in secondClone {
        total2Sum += line as i32;
    }

    println!("Part Two Total test: {total2Sum}");
}

fn convertSpelledNumToInt(word: &str) -> String {
    let spelledOutNumbers: [&str; 9] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    let position = spelledOutNumbers.iter().position(|&num| num == word).unwrap();

    let num = position as i8 + 1;

    num.to_string()
}

// fn getFirstDigitPosition(line: &str) -> usize {
//     let first = match line.chars().position(|c| c.is_ascii_digit()) {
//         Some(char) => char,
//         None => panic!
//     };
//     first
// }
// fn getFirstNum(line: string) -> char {
//     for c in line.chars() {
//         if c.is_ascii_digit() {
//             println!("First Num: {c}");
//             break c
//         }
//     }
// }
