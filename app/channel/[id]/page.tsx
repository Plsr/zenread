type Props = {
  params: {
    id: string;
  };
};

const ChannelIdPage = ({ params }: Props) => {
  const channelId = parseInt(params.id);

  return <div>Channel {channelId}</div>;
};

export default ChannelIdPage;
