pragma circom 2.1.6;

// Educational example only: proves knowledge of private a and b such that
// a * b == product. The product is public; a and b are private inputs.
template Multiplier2() {
    signal input a;
    signal input b;
    signal input product;

    a * b === product;
}

component main {public [product]} = Multiplier2();
