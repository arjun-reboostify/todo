import { ImFilesEmpty } from '../../assets';

export function NoContent(): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-2'>
      <i className='text-4xl'>
        <ImFilesEmpty />
      </i>
      <h2 className='text-xl'>No goal here click on plus to add</h2>
    </div>
  );
}
