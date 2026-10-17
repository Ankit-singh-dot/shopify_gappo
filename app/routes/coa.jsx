import { redirect } from 'react-router';

export function loader() {
  return redirect('/story#coa');
}

export default function CoaRedirect() {
  return null;
}
