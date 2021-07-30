import { CODE_TRIPLE_NUMBERS, init, refresh } from '../../../test';


describe( 'Input', () => {
  const Editor = init( CODE_TRIPLE_NUMBERS );
  const { Input, Selection, Code } = Editor.Components;

  beforeEach( () => {
    refresh( Editor, CODE_TRIPLE_NUMBERS );
  } );

  test( 'can set a new state to apply to the editor.', () => {
    Selection.set( [ 0, 0 ] );
    Input.set( 'customInput', { value: 'abc' } );
    Input.apply();
    expect( Code.getLine( 0 ) ).toBe( 'abc\n' );
  } );

  test( 'can directly apply a new state.', () => {
    Selection.set( [ 0, 0 ] );
    Input.apply( { type: 'customInput', value: 'def' } );
    expect( Code.getLine( 0 ) ).toBe( 'def\n' );
  } );

  test( 'can get the current state.', () => {
    Selection.set( [ 0, 0 ] );
    Input.set( 'customInput', { value: 'abc' } );
    expect( Input.get() ).toStrictEqual( { type: 'customInput', value: 'abc' } );
  } );

  test( 'can modify the current state.', () => {
    Selection.set( [ 0, 0 ] );

    Input.set( 'customInput', { value: 'abc' } );
    Input.set( 'customInput', { value: 'def' } );
    Input.set( 'customInput', { offset: 2 } );
    expect( Input.get() ).toStrictEqual( { type: 'customInput', value: 'def', offset: 2 } );

    Input.apply();
    expect( Code.getLine( 0 ) ).toBe( 'def\n' );
  } );

  test( 'can insert a string instead of replacing the whole value.', () => {
    Selection.set( [ 0, 2 ] );

    Input.set( 'customInput', { insertion: 'abc' } );
    Input.apply();

    expect( Code.getLine( 0 ) ).toBe( '12abc3\n' );
  } );

  test( 'can specify rows to edit.', () => {
    Selection.set( [ 0, 0 ] );

    Input.set( 'customInput', { value: 'abc', startRow: 1, endRow: 1 } );
    Input.apply();

    expect( Code.getLine( 0 ) ).toBe( '123\n' );
    expect( Code.getLine( 1 ) ).toBe( 'abc\n' );
    expect( Code.getLine( 2 ) ).toBe( '789' );

    Input.set( 'customInput', { value: 'def', startRow: 0, endRow: 1 } );
    Input.apply();

    expect( Code.getLine( 0 ) ).toBe( 'def\n' );
    expect( Code.getLine( 1 ) ).toBe( '789' );
  } );

  test( 'can specify a number of cols to offset.', () => {
    Selection.set( [ 0, 0 ] );
    Input.set( 'customInput', { value: 'abc', offset: 1 } );
    Input.apply();

    const range = Selection.get();
    expect( range.start ).toEqual( [ 0, 1 ] );
    expect( range.end ).toEqual( [ 0, 1 ] );
  } );

  test( 'can specify a position after the input.', () => {
    Selection.set( [ 0, 0 ] );
    Input.set( 'customInput', { value: 'abc', position: [ 1, 0 ] } );
    Input.apply();

    const range = Selection.get();
    expect( range.start ).toEqual( [ 1, 0 ] );
    expect( range.end ).toEqual( [ 1, 0 ] );
  } );
} );
