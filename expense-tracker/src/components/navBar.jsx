import React from "react";

function NavBar() {
  // hooks

  const navOptions = [ // later on is .map() into li elements
    'General',
    'Educación',
    'Experiencia',
  ];
  const nav = navOptions.map(
    (option) => <li><a href={`${option}`}>{option}</a></li>
  );

  return <>
  <nav>
    <ul className='flex justify-center gap-24 mx-8 py-6 border-b border-b-neutral-400'>
      {nav}
    </ul>
  </nav>
  </>
}

export default NavBar