module.exports = {
  getProps: function(member, extra) {
    requestProps = {}
    var apiUrl = 'https://' + member.team + '.slack.com/api/';
    requestProps.inviteUrl = apiUrl + 'users.admin.invite';
    requestProps.channelUrl = apiUrl + 'chat.postMessage?';

    requestProps.form = {
      t: (new Date).getTime(),
      token: process.env.SLACK_TOKEN,
      first_name: member.name.split(' ')[0],
      last_name: member.name.split(' ').slice(1),
      email: member.email,
      channels: extra.slack_channels,
      set_active: true,
      _attempts: 1
    };

    return requestProps;
  }
}
