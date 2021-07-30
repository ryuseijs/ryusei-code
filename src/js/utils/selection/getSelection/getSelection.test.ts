import { getSelection } from './getSelection';


describe( 'getSelection', () => {
  test( 'can return the Selection instance.', () => {
    const selection = getSelection();
    expect( selection instanceof Selection ).toBe( true );
  } );
} );
