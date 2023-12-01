use std::fs;

fn main() {
    println!("Hello, world!");

    let puzzle = fs::read_to_string("puzzle-input")
        .expect("Should have been able to read the file");
    let mut lineSums = Vec::new();
    let lines = puzzle.lines();

    for line in lines {
        println!("{}", line);
        let possibleFirst = line.chars().find(|c| c.is_ascii_digit())
            .expect("line should have a digit");

        println!("First num: {possibleFirst}");

        let possibleLast = line.chars().rfind(|c| c.is_ascii_digit())
            .expect("line should have an ending digit");
        println!("Last num: {possibleLast}");

        let mut combinedNum = possibleFirst.to_string();
        combinedNum.push_str(&possibleLast.to_string());
        let num: i8 = combinedNum.parse().unwrap();
        println!("Num: {num}");
        lineSums.push(num);
    }

    let mut totalSum: i32 = 0;
    for line in lineSums {
        totalSum += line as i32;
        println!("{}", line);
    }
    println!("Total: {totalSum}")
    //println!("Content:\n{puzzle}");
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
